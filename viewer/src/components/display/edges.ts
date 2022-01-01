import { IFCModel } from '@olifyio/web-ifc-three/IFC/components/IFCModel';
import { EdgesGeometry, LineSegments, Material } from 'three';
import { Context } from '../../base-types';

export class Edges {
  threshold = 30;
  private readonly edges: {
    [name: string]: {
      edges: LineSegments;
      originalMaterials: Material | Material[];
      baseMaterial: Material | undefined;
      model: IFCModel;
      active: boolean;
    };
  };

  constructor(private context: Context) {
    this.edges = {};
  }

  private static setupModelMaterial(material: Material) {
    material.polygonOffset = true;
    material.polygonOffsetFactor = 1;
    material.polygonOffsetUnits = 1;
  }

  getAll() {
    return Object.keys(this.edges);
  }

  get(name: string) {
    return this.edges[name];
  }

  // TODO: Implement ids to create filtered edges / edges by floor plan
  create(name: string, modelID: number, lineMaterial: Material, material?: Material) {
    const model = this.context.items.ifcModels.find(
      (model) => model.modelID === modelID
    ) as IFCModel;
    if (!model) return;
    const planes = this.context.getClippingPlanes();
    lineMaterial.clippingPlanes = planes;
    if (material) material.clippingPlanes = planes;
    this.setupModelMaterials(model);
    const geo = new EdgesGeometry(model.geometry, this.threshold);
    lineMaterial.clippingPlanes = this.context.getClippingPlanes();
    this.edges[name] = {
      edges: new LineSegments(geo, lineMaterial),
      originalMaterials: model.material,
      baseMaterial: material,
      model,
      active: false
    };
  }

  toggle(name: string, active?: boolean) {
    const selected = this.edges[name];
    if (!selected) return;
    if (active === undefined) active = !selected.active;
    selected.active = active;
    if (active) {
      const pos = selected.model.position;
      const rot = selected.model.rotation;
      selected.edges.position.set(pos.x, pos.y, pos.z);
      selected.edges.rotation.set(rot.x, rot.y, rot.z);
      if (selected.baseMaterial) selected.model.material = selected.baseMaterial;
      this.context.getScene().add(selected.edges);
      return;
    }
    if (selected.baseMaterial) selected.model.material = selected.originalMaterials;
    selected.edges.removeFromParent();
  }

  private setupModelMaterials(model: IFCModel) {
    if (Array.isArray(model.material)) {
      model.material.forEach((mat) => Edges.setupModelMaterial(mat));
      return;
    }
    Edges.setupModelMaterial(model.material);
  }
}
