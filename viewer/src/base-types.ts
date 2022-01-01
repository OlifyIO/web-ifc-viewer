import { IfcMesh } from '@olifyio/web-ifc-three/IFC/BaseDefinitions';
import {
  Camera,
  Color,
  Intersection,
  Material,
  Mesh,
  MOUSE,
  Object3D,
  Plane,
  Renderer,
  Scene,
  Vector2,
  Vector3
} from 'three';
import { Animator } from './components/context/animator';
import { IfcCamera } from './components/context/camera/camera';
import { FirstPersonControl } from './components/context/camera/controls/first-person-control';
import { OrbitControl } from './components/context/camera/controls/orbit-control';
import { PlanControl } from './components/context/camera/controls/plan-control';
import { IfcEvents } from './components/context/ifcEvent';
import { IfcRenderer } from './components/context/renderer/renderer';
import { IfcScene } from './components/context/scene';
import { LiteEvent } from './utils/LiteEvent';

export interface MouseButtons {
  left: MOUSE;
  middle: MOUSE;
  right: MOUSE;
}

export enum NavigationModes {
  Orbit,
  FirstPerson,
  Plan
}

export enum CameraProjections {
  Perspective,
  Orthographic
}

export interface NavigationMode {
  mode: NavigationModes;
  toggle: (active: boolean, options?: any) => void;
  enabled: boolean;
  onChange: LiteEvent<any>;
  onChangeProjection: LiteEvent<Camera>;
}

export interface NavModeManager {
  [NavigationModes.Orbit]: OrbitControl;
  [NavigationModes.FirstPerson]: FirstPersonControl;
  [NavigationModes.Plan]: PlanControl;
}

export interface ViewerOptions {
  container: HTMLElement;
  preselectMaterial?: Material;
  selectMaterial?: Material;
  backgroundColor?: Color;
}

interface Component {
  update: (_delta: number) => void;
  dispose: () => void;
}

export interface Items {
  components: Component[];
  ifcModels: IfcMesh[];
  pickableIfcModels: IfcMesh[];
}

export interface Context {
  items: Items;
  options: ViewerOptions;

  events: IfcEvents;
  renderer: IfcRenderer;
  scene: IfcScene;

  getScene: () => Scene;
  getCamera: () => Camera;
  getRenderer: () => Renderer;
  getDomElement: () => HTMLElement;
  getDomElement2D: () => HTMLElement;
  getDimensions: () => Vector2;
  getClippingPlanes: () => Plane[];
  getAnimator: () => Animator;
  getCenter: (mesh: Mesh) => Vector3 | null;
  ifcCamera: IfcCamera;

  fitToFrame: () => void;
  toggleCameraControls: (active: boolean, options?: any) => void;
  addComponent: (component: Component) => void;
  addClippingPlane: (plane: Plane) => void;
  removeClippingPlane: (plane: Plane) => void;
  castRay: (items: Object3D[]) => Intersection[];
  castRayIfc: () => Intersection | null;
}

export abstract class IfcComponent implements Component {
  protected constructor(context: Context) {
    context.addComponent(this);
  }

  update(_delta: number) {}

  dispose() {}
}

export interface fpsControl {
  active: boolean;
  keys: string[];
}

export interface fpsControls {
  forward: fpsControl;
  back: fpsControl;
  right: fpsControl;
  left: fpsControl;
  up: fpsControl;
  down: fpsControl;
}

export enum dimension {
  x = 'x',
  y = 'y',
  z = 'z'
}
