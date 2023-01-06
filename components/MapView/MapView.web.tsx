import React from "react";
// import { StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";

import { Text, View } from "../Themed";

// import { nodes, nodeType0 } from "~/DATA/data";

export default function MyMapView() {
  // TODO
  // request nodes and for each node, nodeType and statuses (request nodetypes once)
  return (
    <View>
      <Text>La Carte ne marche pas sur le web pour le moment</Text>
    </View>
  );

  // return (
  //   <MapView style={styles.map}>
  //     {nodes.map((node) => {
  //       const status = nodeType0.statuses.find(
  //         (status) => status.id === node.currentStatusID
  //       );
  //       return (
  //         <Marker
  //           key={node.id}
  //           coordinate={{
  //             latitude: node.position.latitude,
  //             longitude: node.position.longitude,
  //           }}
  //           pinColor={status?.color}
  //         />
  //       );
  //     })}
  //   </MapView>
  // );
}

// const styles = StyleSheet.create({
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });
