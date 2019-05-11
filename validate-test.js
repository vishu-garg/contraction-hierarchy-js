const createGraph = require('ngraph.graph');
const pathNGraph = require('ngraph.path');

const { Graph } = require('../geojson-dijkstra/index.js');

// load utility functions
const { readyNetwork, cleanseNetwork, getNGraphDist, populateNGraph } = require('./common.js');

// load contraction hierarchy version bidirectional dijkstra
const {
  queryContractionHierarchy
} = require('./alt-run-contraction-hierarchy');


const { contractGraph } = require('./alt-build-contraction-hierarchy.js');



main();

async function main() {

  const geofile = await readyNetwork();
  const geojson = cleanseNetwork(geofile);

  const fasterDijkstra = new Graph();
  fasterDijkstra.loadFromGeoJson(geojson);

  contractGraph(fasterDijkstra);

  const adj_keys = Object.keys(fasterDijkstra.adjacency_list);
  const adj_length = adj_keys.length;

  const ngraph = createGraph();
  populateNGraph(ngraph, geojson);

  const pathFinder = pathNGraph.aStar(ngraph, {
    distance(fromNode, toNode, link) {
      return link.data._cost;
    }
  });


  const coords = [];

  for (let i = 0; i < 100; i++) {
    const rnd1 = Math.floor(Math.random() * adj_length);
    const rnd2 = Math.floor(Math.random() * adj_length);
    const coord = [adj_keys[rnd1], adj_keys[rnd2]];
    //const coord = ['-108.204345703125,40.22921818870117','-108.204345703125,40.22921818870117'];
    coords.push(coord);
  }

  const ch = [];
  const ng = [];


  coords.forEach((pair, index) => {
    process.stdout.write(
      'Processing ' +
      ((index / coords.length) * 100).toFixed(2) +
      '% complete... ' +
      index +
      '  ' +
      pair +
      '                 \r\n'
    );
    console.log('----');


    console.time('nGraph');
    ng[index] = getNGraphDist(pathFinder.find(pair[0], pair[1]));
    console.timeEnd('nGraph');

    console.time('ch');
    ch[index] = queryContractionHierarchy(
      fasterDijkstra,
      pair[0],
      pair[1]
    );
    console.timeEnd('ch');

  });

  let error_count = 0;
  for (let i = 0; i < coords.length; i++) {
    const values = [
      ng[i].distance,
      ch[i].distance,
    ];

    let min = Infinity;
    let max = -Infinity;

    values.forEach(val => {
      if (val < min) {
        min = val;
      }
      if (val > max) {
        max = val;
      }
    });

    if (max - min > 0.000001) {
      error_count++;
      console.log(
        i,
        coords[i],
        // ng[i].edgelist.length,
        ng[i].distance,
        // ch[i].segments.length,
        ch[i].distance
      );
    }
  }
  console.log(`There were ${error_count} errors.`);
}
