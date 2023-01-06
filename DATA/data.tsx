import { Node, NodeType } from "./interface";

const node0: Node = {
  id: "0",
  name: "Toilettes de l'entrée",
  position: {
    latitude: 13.767446,
    longitude: 100.616028,
  },
  nodeTypeID: "0",
  currentStatusID: "0",
};

const node1: Node = {
  id: "1",
  name: "Toilettes cafétéria",
  position: {
    latitude: 12.767446,
    longitude: 100.616028,
  },
  nodeTypeID: "1",
  currentStatusID: "1",
};

const node2: Node = {
  id: "2",
  name: "Toilettes scène musicale",
  position: {
    latitude: 13.767446,
    longitude: 101.616028,
  },
  nodeTypeID: "2",
  currentStatusID: "2",
};

export const nodeType0: NodeType = {
  id: "0",
  name: "Toilettes",
  description:
    "Toilettes sèches du festival. Elles doivent être nettoyées régulièrement.",
  image:
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  statuses: [
    {
      id: "0",
      name: "Normal",
      description: "Les toilettes sont fonctionnelles",
      color: "green",
    },
    {
      id: "1",
      name: "Sales",
      description: "Les toilettes sont sales et doivent être nettoyées",
      color: "red",
    },
  ],
};

export const nodes: Node[] = [node0, node1, node2];
