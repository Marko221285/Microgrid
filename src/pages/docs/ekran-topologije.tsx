import React, { ChangeEvent, useCallback, useState } from 'react';
import { FunctionComponent } from 'react';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiCheckboxGroup,
  EuiFormRow,
  EuiDatePicker,
  EuiRange,
} from '@elastic/eui';
import DocsLayout from '../../layouts/docs';
import { htmlIdGenerator } from '@elastic/eui/lib/services';
import { docsLayout } from '../../layouts/docs.styles';
import moment from 'moment';
import MapGl, { Viewport } from '../../components/map/MapGL';

const idPrefix = htmlIdGenerator()();

const Index: FunctionComponent = () => {
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({});
  const [startDate, setStartDate] = useState(moment());
  const [energyValue, setEnergyValue] = useState('20');
  const [waterValue, setWaterValue] = useState('20');
  const [bbox, setBbox] = useState<number[] | undefined>();
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 45.81501,
    longitude: 15.981919,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const checkboxes = [
    {
      id: `${idPrefix}0`,
      label: 'Energetska mreža',
    },
    {
      id: `${idPrefix}1`,
      label: 'VN vodovi',
      className: 'em',
    },
    {
      id: `${idPrefix}2`,
      label: 'SN vodovi',
      className: 'em',
    },
    {
      id: `${idPrefix}3`,
      label: 'NN vodovi',
      className: 'em',
    },
    {
      id: `${idPrefix}4`,
      label: 'transformatorske stanice',
      className: 'em',
    },
    {
      id: `${idPrefix}5`,
      label: 'Vodovodna mreža',
    },
    {
      id: `${idPrefix}6`,
      label: 'Sunčana mreža',
    },
    {
      id: `${idPrefix}7`,
      label: 'Heatmap on/off',
    },
  ];
  const checkboxes2 = [
    {
      id: `${idPrefix}8`,
      label: 'Baterijski spremnik',
    },
    {
      id: `${idPrefix}9`,
      label: 'Spremnik vode',
    },
  ];

  const onCheckboxChange = (optionId: any) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
    console.log(checkboxes[0].id);
  };

  const handleDateChange = (date: any) => {
    setStartDate(date);
    console.log(date);
  };

  const onChangeEnergyRange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnergyValue(e.target.value);
  };

  const onChangeWaterRange = (e: ChangeEvent<HTMLInputElement>) => {
    setWaterValue(e.target.value);
  };

  const onSearchAreaClicked = useCallback(() => {
    setBbox(viewport?.bbox);
  }, [viewport]);

  const styles = docsLayout();

  return (
    <DocsLayout
      pageHeader={{
        pageTitle: 'Ekran topologije',
      }}>
      <EuiFlexGroup gutterSize="xl">
        <EuiFlexItem style={{ flexGrow: 2 }}>
          <MapGl
            onSearchAreaClicked={onSearchAreaClicked}
            onSetViewport={setViewport}
            /* hits={results?.hits.items || []} */
            accessToken="pk.eyJ1IjoicmljaGhvb2RpZSIsImEiOiJja3ZndzlhMmQxdnE4MnVxaTFjcXNrdTdmIn0.eNMjE6h0bdJLR3J5QTYbTg"
            viewport={viewport}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ flexGrow: 1 }}>
          <EuiText size="s">
            <b>Mogućnosti prikaza:</b>
          </EuiText>
          <EuiCheckboxGroup
            options={checkboxes}
            idToSelectedMap={checkboxIdToSelectedMap}
            onChange={id => onCheckboxChange(id)}
            compressed
            css={styles.checkbox}
          />
          <EuiSpacer size="m" />
          <EuiText size="s">
            <b>Aktiviraj:</b>
          </EuiText>
          <EuiCheckboxGroup
            options={checkboxes2}
            idToSelectedMap={checkboxIdToSelectedMap}
            onChange={id => onCheckboxChange(id)}
            compressed
          />
          <EuiSpacer size="m" />
          <EuiText size="s">
            <b>Trenutak u godini:</b>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiFormRow>
            <EuiDatePicker
              showTimeSelect
              selected={startDate}
              onChange={handleDateChange}
            />
          </EuiFormRow>
          <EuiSpacer size="m" />
          <EuiText size="s">
            <b>Energetska neovisnost:</b>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiRange
            id={htmlIdGenerator()()}
            step={10}
            value={energyValue}
            onChange={onChangeEnergyRange}
            showTicks
          />
          <EuiSpacer size="m" />
          <EuiText size="s">
            <b>Neovisnost opskrbe vodom:</b>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiRange
            id={htmlIdGenerator()()}
            step={10}
            value={waterValue}
            onChange={onChangeWaterRange}
            showTicks
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </DocsLayout>
  );
};

export default Index;
