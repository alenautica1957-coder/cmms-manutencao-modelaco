import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [tab, setTab] = useState('dash');
  const [osList, setOsList] = useState([
    { id: 101, eq: 'Prensa Hidráulica 150T', tipo: 'Corretiva', tec: 'Carlos Silva', status: 'Aberta', desc: 'Vazamento na gaxeta' },
    { id: 102, eq: 'Compressor 40HP', tipo: 'Preventiva', tec: 'Marcos Oliveira', status: 'Concluída', desc: 'Troca de óleo' }
  ]);
  const [equipamentos] = useState([
    { nome: 'Prensa Hidráulica 150T', setor: 'Estamparia', status: 'Operacional' },
    { nome: 'Torno CNC Romi', setor: 'Usinagem', status: 'Em Manutenção' }
  ]);
  const [pecas] = useState([
    { codigo: 'PEC-001', nome: 'Correia em V', qtd: 4, min: 2 },
    { codigo: 'PEC-002', nome: 'Óleo Hidráulico (L)', qtd: 45, min: 20 }
  ]);

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', color: '#333' }}>
      <Head>
        <title>CMMS Manutenção Modelaço</title>
      </Head>

      <header style={{ backgroundColor: '#1e293b', color: '#fff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px' }}>CMMS Manutenção Modelaço</h1>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Gestão de Manutenção & Ativos</span>
        </div>
        <div style={{ fontSize: '13px', backgroundColor: '#334155', padding: '6px 12px', borderRadius: '4px' }}>
          Engenharia de Manutenção
        </div>
      </header>

      <nav style={{ display: 'flex', backgroundColor: '#334155', padding: '0 40px', gap: '10px' }}>
        <button onClick={() => setTab('dash')} style={{ background: 'none', border: 'none', color: tab === 'dash' ? '#fff' : '#94a3b8', padding: '15px 20px', cursor: 'pointer', fontWeight: tab === 'dash' ? 'bold' : 'normal', borderBottom: tab === 'dash' ? '3px solid #3b82f6' : 'none' }}>Dashboard</button>
        <button onClick={() => setTab('os')} style={{ background: 'none', border: 'none', color: tab === 'os' ? '#fff' : '#94a3b8', padding: '15px 20px', cursor: 'pointer', fontWeight: tab === 'os' ? 'bold' : 'normal', borderBottom: tab === 'os' ? '3px solid #3b82f6' : 'none' }}>Ordens de Serviço</button>
        <button onClick={() => setTab('equip')} style={{ background: 'none', border: 'none', color: tab === 'equip' ? '#fff' : '#94a3b8', padding: '15px 20px', cursor: 'pointer', fontWeight: tab === 'equip' ? 'bold' : 'normal', borderBottom: tab === 'equip' ? '3px solid #3b82f6' : 'none' }}>Equipamentos</button>
        <button onClick={() => setTab('estoque')} style={{ background: 'none', border: 'none', color: tab === 'estoque' ? '#fff' : '#94a3b8', padding: '15px 20px', cursor: 'pointer', fontWeight: tab === 'estoque' ? 'bold' : 'normal', borderBottom: tab === 'estoque' ? '3px solid #3b82f6' : 'none' }}>Estoque</button>
      </nav>

      <main style={{ padding: '30px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        {tab === 'dash' && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Indicadores Operacionais</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Total de OS</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#1e293b' }}>{osList.length}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Equipamentos Ativos</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#1e293b' }}>{equipamentos.filter(e => e.status === 'Operacional').length}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'os' && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Ordens de Serviço</h2>
            <table style={{ width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>ID</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Equipamento</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Tipo</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Técnico</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {osList.map(os => (
                  <tr key={os.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>#{os.id}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{os.eq}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{os.tipo}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{os.tec}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>
                      <span style={{ backgroundColor: os.status === 'Concluída' ? '#dcfce7' : '#fef9c3', color: os.status === 'Concluída' ? '#166534' : '#854d0e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        {os.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'equip' && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Equipamentos</h2>
            <table style={{ width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Nome</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Setor</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {equipamentos.map((e, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{e.nome}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{e.setor}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'estoque' && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Estoque de Peças</h2>
            <table style={{ width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Código</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Peça</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Qtd Atual</th>
                  <th style={{ padding: '12px 15px', fontSize: '13px', color: '#475569' }}>Mínimo</th>
                </tr>
              </thead>
              <tbody>
                {pecas.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{p.codigo}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{p.nome}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{p.qtd}</td>
                    <td style={{ padding: '12px 15px', fontSize: '14px' }}>{p.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}



 

     
    
     
             
       
              
              
               
      
        
             
          
        

    
               
            
