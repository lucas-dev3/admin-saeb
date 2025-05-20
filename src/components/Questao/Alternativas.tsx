import React, { useState } from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Alternativa {
  valor: string;
  correta: boolean;
}

interface AlternativasProps {
  quantidadePadrao?: number;
}

const Alternativas: React.FC<AlternativasProps> = ({ quantidadePadrao = 0 }) => {
  const [alternativas, setAlternativas] = useState<Alternativa[]>(
    Array.from({ length: quantidadePadrao }, () => ({ valor: '', correta: false }))
  );

  const adicionarAlternativa = () => {
    setAlternativas([...alternativas, { valor: '', correta: false }]);
  };

  const atualizarAlternativa = (index: number, valor: string, correta: boolean) => {
    const novasAlternativas = alternativas.map((alt, i) =>
      i === index ? { valor, correta } : { ...alt, correta: false }
    );
    setAlternativas(novasAlternativas);
  };

  const deletarAlternativa = (index: number) => {
    const novasAlternativas = alternativas.filter((_, i) => i !== index);
    setAlternativas(novasAlternativas);
  };

  return (
    <Form layout="vertical" style={{
      marginTop: 16,
      marginBottom: 16
    }}>
      {alternativas.map((alt, index) => (
        <Form.Item key={index} label={`Alternativa ${index + 1}`} style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            value={alt.valor}
            onChange={(e) => atualizarAlternativa(index, e.target.value, alt.correta)}
            style={{ width: '60%', marginRight: 8 }}
          />
          <Radio
            checked={alt.correta}
            onChange={() => atualizarAlternativa(index, alt.valor, true)}
          >
            Correta
          </Radio>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deletarAlternativa(index)}
            style={{ marginLeft: 8 }}
          />
        </Form.Item>
      ))}
      <Button type="dashed" onClick={adicionarAlternativa} style={{ width: '100%' }}>
        Adicionar Alternativa
      </Button>
    </Form>
  );
};

export default Alternativas; 