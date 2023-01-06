export interface Node {
  id: string;
  name: string;
  position: Position;
  nodeTypeID: string;
  currentStatusID: string; // one of the statuses in nodeType
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Status {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface NodeType {
  id: string;
  name: string;
  description: string;
  image: string;
  statuses: Status[];
}
