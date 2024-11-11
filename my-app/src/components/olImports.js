import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { fromLonLat, get as getProjection, transform } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector, Cluster } from 'ol/source';
import TileWMS from 'ol/source/TileWMS.js';
import Feature from 'ol/Feature.js';
import { Point } from 'ol/geom';

export {
    OlMap,
    View,
    defaultControls,
    fromLonLat,
    getProjection,
    transform,
    TileLayer,
    VectorLayer,
    XYZ,
    Vector,
    Cluster,
    TileWMS,
    Feature,
    Point,
};