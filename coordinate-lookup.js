const kdbush = require('kdbush');
const geokdbush = require('geokdbush');

exports.CoordinateLookup = CoordinateLookup;

function CoordinateLookup(graph) {

  // TODO coordinate lookup almost assuredly broken
  // should only apply on GeoJSON datasets ??

  const points_set = new Set();

  Object.keys(graph.adjacency_list).forEach(key => {
    points_set.add(key);
  });

  const coordinate_list = [];

  points_set.forEach(pt_str => {
    coordinate_list.push(pt_str.split(',').map(d => Number(d)));
  });

  this.index = kdbush(coordinate_list, (p) => p[0], (p) => p[1]);
}

CoordinateLookup.prototype.getClosestNetworkPt = function(lng, lat) {
  return geokdbush.around(this.index, lng, lat, 1)[0];
};
