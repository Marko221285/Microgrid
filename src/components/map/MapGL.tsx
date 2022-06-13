import React, { useCallback, useMemo, useRef, useState } from 'react';
import MapGL, {
  Popup,
  NavigationControl,
  MapRef,
  Source,
  Layer,
  Map,
} from 'react-map-gl';
import { SearchkitHit } from '@searchkit/sdk';
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
/* import { HitCard } from "src/Card"; */
import { EuiButton } from '@elastic/eui';

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  bbox?: number[];
};

export type MapGlProps = {
  viewport: Viewport;
  hits?: SearchkitHit[];
  onSetViewport: (vp: Viewport) => void;
  accessToken: string;
  onSearchAreaClicked: () => void;
  onLoaded?: () => void;
};

const restMapPros = {
  width: '100%',
  height: '100%',
  mapStyle: 'mapbox://styles/mapbox/streets-v11?optimize=true',
};

const navControlStyle = {
  right: 10,
  top: 10,
};

const MapGl: React.FC<MapGlProps> = (props: MapGlProps) => {
  const [popupInfo, setPopupInfo] = useState<SearchkitHit | undefined>();
  const [createRoof, setCreateRoof] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const refVp = useRef<Viewport | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const onVpBegin = useCallback(() => {
    refVp.current = props.viewport;
  }, [props.viewport]);

  const handleOnClick = useCallback(
    event => {
      const id = event?.features?.[0].properties?.id;
      setPopupInfo(props.hits.find(x => x.id === id));
    },
    [props]
  );

  const onLoaded = useCallback(() => {
    setIsLoaded(true);
    if (props.onLoaded) props.onLoaded();
  }, [setIsLoaded]);

  const onSearchButtonClicked = useCallback(() => {
    props?.onSearchAreaClicked();
  }, [props.onSearchAreaClicked]);

  const viewPortChanged = useCallback(
    (val: Viewport) => {
      const mbounds = mapRef.current?.getMap().getBounds()!;
      val.bbox = [
        mbounds.getNorthEast().lat,
        mbounds.getNorthEast().lng,
        mbounds.getSouthWest().lat,
        mbounds.getSouthWest().lng,
      ];
      props.onSetViewport(val);
    },
    [props.onSetViewport]
  );
  const geojson = useMemo(() => toGeojson(props.hits), [props.hits]);
  return (
    <div style={{ height: '640px' }}>
      <MapGL
        scrollZoom={true}
        dragRotate={false}
        {...props.viewport}
        {...restMapPros}
        onLoad={onLoaded}
        onMove={evt => viewPortChanged(evt.viewState)}
        mapboxAccessToken={props.accessToken}
        onMouseDown={onVpBegin}
        onTouchStart={onVpBegin}
        ref={map => (mapRef.current = map)}
        onClick={handleOnClick}
        interactiveLayerIds={['points']}
        cursor={'default'}>
        <Source id="my-data" type="geojson" data={geojson as any}>
          <Layer
            type="circle"
            id="points"
            paint={{
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['number', ['get', 'area']],
                0,
                4,
                8,
                16,
                32,
                64,
              ],
              'circle-color': [
                'interpolate',
                ['linear'],
                ['number', ['get', 'suitability']],
                0,
                '#2DC4B2',
                1,
                '#ffff33',
                2,
                '#ffda00',
                3,
                '#ffa701',
              ],
              'circle-opacity': 0.8,
            }}
          />
        </Source>
        <NavigationControl
          style={navControlStyle}
          //onClick={() => setIsBtnEnabled(true)}
        />
        <SearchAreaButton onClick={onSearchButtonClicked} />
        {popupInfo && (
          <Popup
            anchor="left"
            longitude={popupInfo.fields.lng}
            latitude={popupInfo.fields.lat}
            closeOnClick={true}
            onClose={() => setPopupInfo(undefined)}>
            {/* <HitCard hit={popupInfo} /> */}
          </Popup>
        )}
      </MapGL>
    </div>
  );
};

export default MapGl;

type SearchAreaButtonProps = {
  onClick: () => void;
};

function SearchAreaButton(props: SearchAreaButtonProps) {
  return (
    <EuiButton
      style={{ marginTop: '10px', marginLeft: '10px' }}
      onClick={props.onClick}
      className="mapboxgl-ctrl">
      Pretraži područje
    </EuiButton>
  );
}

function toGeojson(hit: SearchkitHit[]) {
  return {
    type: 'FeatureCollection',
    features: hit?.map(p => ({
      type: 'Feature',
      properties: {
        area: p.fields.usable_are / 25,
        id: p.id,
      },
      geometry: {
        type: 'Point',
        coordinates: [p.fields.lng, p.fields.lat],
      },
    })),
  };
}
