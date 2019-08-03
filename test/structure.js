'use strict'; // code generated by pbf v3.2.0

// ContractionHierarchy ========================================

var ContractionHierarchy = exports.ContractionHierarchy = {};

ContractionHierarchy.read = function (pbf, end) {
    return pbf.readFields(ContractionHierarchy._readField, {_locked: false, _geoJsonFlag: false, adjacency_list: [], reverse_adjacency_list: [], _nodeToIndexLookup: {}, _edgeProperties: [], _edgeGeometry: []}, end);
};
ContractionHierarchy._readField = function (tag, obj, pbf) {
    if (tag === 1) obj._locked = pbf.readBoolean();
    else if (tag === 2) obj._geoJsonFlag = pbf.readBoolean();
    else if (tag === 3) obj.adjacency_list.push(ContractionHierarchy.AdjList.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 4) obj.reverse_adjacency_list.push(ContractionHierarchy.AdjList.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 5)  { var entry = ContractionHierarchy._FieldEntry5.read(pbf, pbf.readVarint() + pbf.pos); obj._nodeToIndexLookup[entry.key] = entry.value; }
    else if (tag === 6) obj._edgeProperties.push(ContractionHierarchy._EDGEPROPERTIES.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 7) obj._edgeGeometry.push(ContractionHierarchy.GeometryArray.read(pbf, pbf.readVarint() + pbf.pos));
};
ContractionHierarchy.write = function (obj, pbf) {
    if (obj._locked) pbf.writeBooleanField(1, obj._locked);
    if (obj._geoJsonFlag) pbf.writeBooleanField(2, obj._geoJsonFlag);
    if (obj.adjacency_list) for (var i = 0; i < obj.adjacency_list.length; i++) pbf.writeMessage(3, ContractionHierarchy.AdjList.write, obj.adjacency_list[i]);
    if (obj.reverse_adjacency_list) for (i = 0; i < obj.reverse_adjacency_list.length; i++) pbf.writeMessage(4, ContractionHierarchy.AdjList.write, obj.reverse_adjacency_list[i]);
    if (obj._nodeToIndexLookup) for (i in obj._nodeToIndexLookup) if (Object.prototype.hasOwnProperty.call(obj._nodeToIndexLookup, i)) pbf.writeMessage(5, ContractionHierarchy._FieldEntry5.write, { key: i, value: obj._nodeToIndexLookup[i] });
    if (obj._edgeProperties) for (i = 0; i < obj._edgeProperties.length; i++) pbf.writeMessage(6, ContractionHierarchy._EDGEPROPERTIES.write, obj._edgeProperties[i]);
    if (obj._edgeGeometry) for (i = 0; i < obj._edgeGeometry.length; i++) pbf.writeMessage(7, ContractionHierarchy.GeometryArray.write, obj._edgeGeometry[i]);
};

// ContractionHierarchy.EdgeAttrs ========================================

ContractionHierarchy.EdgeAttrs = {};

ContractionHierarchy.EdgeAttrs.read = function (pbf, end) {
    return pbf.readFields(ContractionHierarchy.EdgeAttrs._readField, {end: 0, cost: 0, attrs: 0}, end);
};
ContractionHierarchy.EdgeAttrs._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.end = pbf.readVarint();
    else if (tag === 2) obj.cost = pbf.readDouble();
    else if (tag === 3) obj.attrs = pbf.readVarint();
};
ContractionHierarchy.EdgeAttrs.write = function (obj, pbf) {
    if (obj.end) pbf.writeVarintField(1, obj.end);
    if (obj.cost) pbf.writeDoubleField(2, obj.cost);
    if (obj.attrs) pbf.writeVarintField(3, obj.attrs);
};

// ContractionHierarchy.AdjList ========================================

ContractionHierarchy.AdjList = {};

ContractionHierarchy.AdjList.read = function (pbf, end) {
    return pbf.readFields(ContractionHierarchy.AdjList._readField, {edges: []}, end);
};
ContractionHierarchy.AdjList._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.edges.push(ContractionHierarchy.EdgeAttrs.read(pbf, pbf.readVarint() + pbf.pos));
};
ContractionHierarchy.AdjList.write = function (obj, pbf) {
    if (obj.edges) for (var i = 0; i < obj.edges.length; i++) pbf.writeMessage(1, ContractionHierarchy.EdgeAttrs.write, obj.edges[i]);
};

// ContractionHierarchy._EDGEPROPERTIES ========================================

ContractionHierarchy._EDGEPROPERTIES = {};

ContractionHierarchy._EDGEPROPERTIES.read = function (pbf, end) {
    return pbf.readFields(ContractionHierarchy._EDGEPROPERTIES._readField, {STFIPS: 0, CTFIPS: 0, MILES: 0, _cost: 0, _id: 0, _start_index: 0, _end_index: 0, _ordered: []}, end);
};
ContractionHierarchy._EDGEPROPERTIES._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.STFIPS = pbf.readVarint();
    else if (tag === 2) obj.CTFIPS = pbf.readVarint();
    else if (tag === 3) obj.MILES = pbf.readDouble();
    else if (tag === 4) obj._cost = pbf.readDouble();
    else if (tag === 5) obj._id = pbf.readVarint();
    else if (tag === 6) obj._start_index = pbf.readVarint();
    else if (tag === 7) obj._end_index = pbf.readVarint();
    else if (tag === 8) pbf.readPackedVarint(obj._ordered);
};
ContractionHierarchy._EDGEPROPERTIES.write = function (obj, pbf) {
    if (obj.STFIPS) pbf.writeVarintField(1, obj.STFIPS);
    if (obj.CTFIPS) pbf.writeVarintField(2, obj.CTFIPS);
    if (obj.MILES) pbf.writeDoubleField(3, obj.MILES);
    if (obj._cost) pbf.writeDoubleField(4, obj._cost);
    if (obj._id) pbf.writeVarintField(5, obj._id);
    if (obj._start_index) pbf.writeVarintField(6, obj._start_index);
    if (obj._end_index) pbf.writeVarintField(7, obj._end_index);
    if (obj._ordered) pbf.writePackedVarint(8, obj._ordered);
};

// ContractionHierarchy.LineStringAray ========================================

ContractionHierarchy.LineStringAray = {};

ContractionHierarchy.LineStringAray.read = function (pbf, end) {
    return pbf.readFields(ContractionHierarchy.LineStringAray._readField, {coords: []}, end);
};
ContractionHierarchy.LineStringAray._readField = function (tag, obj, pbf) {
    if (tag === 1) pbf.readPackedDouble(obj.coords);
};
ContractionHierarchy.LineStringAray.write = function (obj, pbf) {
    if (obj.coords) pbf.writePackedDouble(1, obj.coords);
};

// ContractionHierarchy.GeometryArray ========================================

ContractionHierarchy.GeometryArray = {};

ContractionHierarchy.GeometryArray.read = function (pbf, end) {
    return pbf.readFields(ContractionHierarchy.GeometryArray._readField, {linestrings: []}, end);
};
ContractionHierarchy.GeometryArray._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.linestrings.push(ContractionHierarchy.LineStringAray.read(pbf, pbf.readVarint() + pbf.pos));
};
ContractionHierarchy.GeometryArray.write = function (obj, pbf) {
    if (obj.linestrings) for (var i = 0; i < obj.linestrings.length; i++) pbf.writeMessage(1, ContractionHierarchy.LineStringAray.write, obj.linestrings[i]);
};

// ContractionHierarchy._FieldEntry5 ========================================

ContractionHierarchy._FieldEntry5 = {};

ContractionHierarchy._FieldEntry5.read = function (pbf, end) {
    return pbf.readFields(ContractionHierarchy._FieldEntry5._readField, {key: "", value: 0}, end);
};
ContractionHierarchy._FieldEntry5._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.key = pbf.readString();
    else if (tag === 2) obj.value = pbf.readVarint();
};
ContractionHierarchy._FieldEntry5.write = function (obj, pbf) {
    if (obj.key) pbf.writeStringField(1, obj.key);
    if (obj.value) pbf.writeVarintField(2, obj.value);
};
