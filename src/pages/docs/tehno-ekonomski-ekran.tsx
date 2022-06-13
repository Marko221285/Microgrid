import { FunctionComponent, useState } from 'react';
import {
  EuiBasicTable,
  EuiFieldText,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import DocsLayout from '../../layouts/docs';
import { docsLayout } from '../../layouts/docs.styles';

const Index: FunctionComponent = () => {
  const [value, setValue] = useState('');

  const items = [
    {
      id: '1',
      elementSustava: 'Sunčana elektrana',
      optimalanOdabir: 'output value',
      trošak: 'output value',
    },
    {
      id: '2',
      elementSustava: 'Baterijski spremnik',
      optimalanOdabir: 'output value',
      trošak: 'output value',
    },
    {
      id: '3',
      elementSustava: 'Desalinizator',
      optimalanOdabir: 'output value',
      trošak: 'output value',
    },
    {
      id: '4',
      elementSustava: 'Spremnik vode',
      optimalanOdabir: 'output value',
      trošak: 'output value',
    },
  ];

  const columns = [
    {
      field: 'elementSustava',
      name: 'Element sustava',
      render: name => <EuiText size="s">{name}</EuiText>,
    },
    {
      field: 'optimalanOdabir',
      name: 'Optimalan odabir',
      render: name => <EuiText size="s">{name}</EuiText>,
    },
    {
      field: 'trošak',
      name: 'Trošak',
      render: name => <EuiText size="s">{name}</EuiText>,
    },
  ];

  const getRowProps = item => {
    const { id } = item;
    return {
      className: 'customRowClass',
      onClick: () => console.log(`Clicked row ${id}`),
    };
  };

  const onChangeFieldText = e => {
    setValue(e.target.value);
  };

  const styles = docsLayout();

  return (
    <DocsLayout
      pageHeader={{
        pageTitle: 'Tehno-ekonomski ekran',
      }}>
      <EuiText css={styles.forms}>
        <EuiFieldText
          placeholder="input value"
          value={value}
          onChange={e => onChangeFieldText(e)}
          prepend={'CAPEX'}
        />
        <EuiFieldText
          placeholder="input value"
          value={value}
          onChange={e => onChangeFieldText(e)}
          prepend={'OPEX'}
        />
        <EuiFieldText
          placeholder="input value"
          value={value}
          onChange={e => onChangeFieldText(e)}
          prepend={'Udio kredita'}
        />
        <EuiFieldText
          placeholder="input value"
          value={value}
          onChange={e => onChangeFieldText(e)}
          prepend={'Kamata'}
        />
      </EuiText>
      <EuiSpacer size="xxl" />
      <EuiBasicTable
        items={items}
        rowHeader="trošak"
        columns={columns}
        rowProps={getRowProps}
        responsive
      />
    </DocsLayout>
  );
};

export default Index;
