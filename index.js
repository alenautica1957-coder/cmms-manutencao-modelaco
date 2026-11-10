import React, { useState } from 'react';
import Head from 'next/head';

export default function ManutencaoModelaco() {
  // Estados do Sistema
  const [activeTab, setActiveTab] = useState('dashboard');

  // Estado de Equipamentos
  const [equipamentos, setEquipamentos] = useState([
    { id: 1, nome: 'Prensa Hidráulica 150T', setor: 'Estamparia', status: 'Operacional' },
    { id: 2, nome: 'Torno CNC Romi Centur', setor, setores: 'Usinagem', status: 'Em Manutenção' },
    { id: 3, nome: 'Compressor de Parafuso 40HP', setor: 'Utilidades', status: 'Operacional' }
  ]);
  const [novoEquip, setNovoEquip] = useState({ nome: '', setor: '', status: 'Operacional' });

  // Estado de Técnicos
  const [tecnicos, setTecnicos] = useState([
    { id: 1, nome: 'Carlos Silva', especialidade: 'Mecânica Industrial' },
    { id: 2, nome: 'Marcos Oliveira', especialidade: 'Elétrica / Automação' }
  ]);
  const [novoTec, setNovoTec] = useState({ nome: '', especialidade: '' });

  // Estado de Estoque de Peças
  const [pecas, setPecas] = useState([
    { id: 1, codigo: 'PEC-001', nome: 'Correia em V A-48', qtd: 4, min: 2 },
    { id: 2, codigo: 'PEC-002', nome: 'Óleo Hidráulico ISO VG 68 (Lts)', qtd: 45, min: 20 },
    { id: 3, codigo: 'PEC-003', nome: 'Disjuntor 32A Tripolar', qtd: 1, min: 3 }
  ]);
  const [novaPeca, setNovaPeca] = useState({ codigo: '', nome: '', qtd: '', min: '' });

  // Estado de Ordens de Serviço (OS)
  const [ordensServico, setOrdensServico] = useState([
    { id: 101, equipamento: 'Prensa Hidráulica 150T', tipo: 'Corretiva', tecnico: 'Carlos Silva', status: 'Aberta', desc: 'Vazamento de óleo na gaxeta superior.' },
    { id: 102, equipamento: 'Compressor de Parafuso 40HP', tipo: 'Preventiva', tecnico: 'Marcos Oliveira', status: 'Concluída', desc: 'Troca de elemento filtrante e óleo.' }
  ]);
  const [novaOS, setNovaOS] = useState({ equipamento: '', tipo: 'Preventiva', tecnico: '', desc: '' });

  // Funções de Cadastro
  const handleAddEquip = (e) => {
    e.preventDefault();
    if (!novoEquip.nome) return;
    setEquipamentos([...equipamentos, { id: Date.now(), ...novoEquip }]);
    setNovoEquip({ nome: '', setor: '', status: 'Operacional' });
  };

  const handleAddTec = (e) => {
    e.preventDefault();
    if (!novoTec.nome) return;
    setTecnicos([...tecnicos, { id: Date.now(), ...novoTec }]);
    setNovoTec({ nome: '', especialidade: '' });
  };

  const handleAddPeca = (e) => {
    e.preventDefault();
    if (!novaPeca.nome) return;
    setPecas([...pecas, { id: Date.now(), ...novaPeca, qtd: Number(novaPeca.qtd), min: Number(novaPeca.min) }]);
    setNovaPeca({ codigo: '', nome: '', qtd: '', min: '' });
  };

  const handleAddOS = (e) => {
    e.preventDefault();
    if (!novaOS.equipamento) return;
    setOrdensServico([...ordensServico, { id: Date.now(), ...novaOS, status: 'Aberta' }]);
    setNovaOS({ equipamento: '', tipo: 'Preventiva', tecnico: '', desc: '' });
  };

  const concluirOS = (id) => {
    setOrdensServico(ordensServico.map(os => os.id === id ? { ...os, status: 'Concluída' } : os));
  };

  // Indicadores (KPIs)
  const totalOS = ordensServico.length;
  const osConcluidas = ordensServico.filter(os => os.status === 'Concluída').length;
  const pecasCriticas = pecas.filter(p => p.qtd <= p.min).length;
  const maquinasAtivas = equipamentos.filter(e => e.status === 'Operacional').length;

  return (
    <div style={styles.container}>
      <Head>
        <title>Manutenção Modelaço - CMMS</title>
      </Head>

      {/* Cabeçalho */}
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <h1 style={styles.title}>Manutenção Modelaço</h1>
          <span style={styles.subtitle}>Sistema de Gestão de Manutenção (CMMS) & Operações</span>
        </div>
        <div style={styles.userBadge}>
          <span>Engenharia de Manutenção & Projetos</span>
        </div>
      </header>

      {/* Navegação por Abas */}
      <nav style={styles.nav}>
        <button style={activeTab === 'dashboard' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button style={activeTab === 'os' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('os')}>Ordens de Serviço</button>
        <button style={activeTab === 'equipamentos' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('equipamentos')}>Equipamentos</button>
        <button style={activeTab === 'estoque' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('estoque')}>Estoque de Peças</button>
        <button style={activeTab === 'tecnicos' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('tecnicos')}>Técnicos</button>
      </nav>

      {/* Conteúdo Principal */}
      <main style={styles.main}>
        
        {/* ABA: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={styles.sectionTitle}>Indicadores Operacionais</h2>
            <div style={styles.kpiGrid}>
              <div style={styles.kpiCard}>
                <h3>Total de OS</h3>
                <p style={styles.kpiValue}>{totalOS}</p>
              </div>
              <div style={styles.kpiCard}>
                <h3>OS Concluídas</h3>
                <p style={styles.kpiValue}>{osConcluidas}</p>
              </div>
              <div style={styles.kpiCard}>
                <h3>Peças em Nível Crítico</h3>
                <p style={{...styles.kpiValue, color: pecasCriticas > 0 ? '#d9534f' : '#28a745'}}>{pecasCriticas}</p>
              </div>
              <div style={styles.kpiCard}>
                <h3>Equipamentos Operacionais</h3>
                <p style={styles.kpiValue}>{maquinasAtivas} / {equipamentos.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* ABA: ORDENS DE SERVIÇO */}
        {activeTab === 'os' && (
          <div>
            <h2 style={styles.sectionTitle}>Gestão de Ordens de Serviço (OS)</h2>
            
            <form onSubmit={handleAddOS} style={styles.formGrid}>
              <select 
                style={styles.input} 
                value={novaOS.equipamento} 
                onChange={e => setNovaOS({...novaOS, equipamento: e.target.value})}
                required
              >
                <option value="">Selecione o Equipamento</option>
                {equipamentos.map(eq => <option key={eq.id} value={eq.nome}>{eq.nome}</option>)}
              </select>

              <select 
                style={styles.input} 
                value={novaOS.tipo} 
                onChange={e => setNovaOS({...novaOS, tipo: e.target.value})}
              >
                <option value="Preventiva">Preventiva</option>
                <option value="Corretiva">Corretiva</option>
                <option value="Preditiva">Preditiva</option>
              </select>

              <select 
                style={styles.input} 
                value={novaOS.tecnico} 
                onChange={e => setNovaOS({...novaOS, tecnico: e.target.value})}
                required
              >
                <option value="">Selecione o Técnico</option>
                {tecnicos.map(tec => <option key={tec.id} value={tec.nome}>{tec.nome}</option>)}
              </select>

              <input 
                style={styles.inputFull} 
                placeholder="Descrição da falha ou serviço a ser executado..." 
                value={novaOS.desc} 
                onChange={e => setNovaOS({...novaOS, desc: e.target.value})}
                required
              />

              <button type="submit" style={styles.button}>Emitir Nova OS</button>
            </form>

            <table style={styles.table}>
              <thead>
                <tr style={styles.trHead}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Equipamento</th>
                  <th style={styles.th}>Tipo</th>
                  <th style={styles.th}>Técnico</th>
                  <th style={styles.th}>Descrição</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {ordensServico.map(os => (
                  <tr key={os.id} style={styles.tr}>
                    <td style={styles.td}>#{os.id}</td>
                    <td style={styles.td}>{os.equipamento}</td>
                    <td style={styles.td}>{os.tipo}</td>
                    <td style={styles.td}>{os.tecnico}</td>
                    <td style={styles.td}>{os.desc}</td>
                    <td style={styles.td}>
                      <span style={os.status === 'Concluída' ? styles.badgeGreen : styles.badgeYellow}>
                        {os.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {os.status === 'Aberta' && (
                        <button style={styles.smallBtn} onClick={() => concluirOS(os.id)}>Concluir</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ABA: EQUIPAMENTOS */}
        {activeTab === 'equipamentos' && (
          <div>
            <h2 style={styles.sectionTitle}>Cadastro de Equipamentos / Ativos</h2>
            
            <form onSubmit={handleAddEquip} style={styles.formGrid}>
              <input 
                style={styles.input} 
                placeholder="Nome do Equipamento / Máquina" 
                value={novoEquip.nome} 
                onChange={e => setNovoEquip({...novoEquip, nome: e.target.value})}
                required
              />
              <input 
                style={styles.input} 
                placeholder="Setor / Área" 
                value={novoEquip.setor} 
                onChange={e => setNovoEquip({...novoEquip, setor: e.target.value})}
                required
              />
              <select 
                style={styles.input} 
                value={novoEquip.status} 
                onChange={e => setNovoEquip({...novoEquip, status: e.target.value})}
              >
                <option value="Operacional">Operacional</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Parado">Parado</option>
              </select>
              <button type="submit" style={styles.button}>Cadastrar Ativo</button>
            </form>

            <table style={styles.table}>
              <thead>
                <tr style={styles.trHead}>
                  <th style={styles.th}>Equipamento</th>
                  <th style={styles.th}>Setor</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {equipamentos.map(eq => (
                  <tr key={eq.id} style={styles.tr}>
                    <td style={styles.td}>{eq.nome}</td>
                    <td style={styles.td}>{eq.setor}</td>
                    <td style={styles.td}>{eq.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ABA: ESTOQUE */}
        {activeTab === 'estoque' && (
          <div>
            <h2 style={styles.sectionTitle}>Controle de Estoque e Peças</h2>
            
            <form onSubmit={handleAddPeca} style={styles.formGrid}>
              <input 
                style={styles.input} 
                placeholder="Código (Ex: PEC-004)" 
                value={novaPeca.codigo} 
                onChange={e => setNovaPeca({...novaPeca, codigo: e.target.value})}
                required
              />
              <input 
                style={styles.input} 
                placeholder="Nome da Peça / Insumo" 
                value={novaPeca.nome} 
                onChange={e => setNovaPeca({...novaPeca, nome: e.target.value})}
                required
              />
              <input 
                style={styles.input} 
                type="number" 
                placeholder="Quantidade Atual" 
                value={novaPeca.qtd} 
                onChange={e => setNovaPeca({...novaPeca, qtd: e.target.value})}
                required
              />
              <input 
                style={styles.input} 
                type="number" 
                placeholder="Estoque Mínimo" 
                value={novaPeca.min} 
                onChange={e => setNovaPeca({...novaPeca, min: e.target.value})}
                required
              />
              <button type="submit" style={styles.button}>Adicionar Peça</button>
            </form>

            <table style={styles.table}>
              <thead>
                <tr style={styles.trHead}>
                  <th style={styles.th}>Código</th>
                  <th style={styles.th}>Peça / Insumo</th>
                  <th style={styles.th}>Qtd Atual</th>
                  <th style={styles.th}>Mínimo</th>
                  <th style={styles.th}>Situação</th>
                </tr>
              </thead>
              <tbody>
                {pecas.map(p => {
                  const critico = p.qtd <= p.min;
                  return (
                    <tr key={p.id} style={styles.tr}>
                      <td style={styles.td}>{p.codigo}</td>
                      <td style={styles.td}>{p.nome}</td>
                      <td style={styles.td}>{p.qtd}</td>
                      <td style={styles.td}>{p.min}</td>
                      <td style={styles.td}>
                        <span style={critico ? styles.badgeRed : styles.badgeGreen}>
                          {critico ? 'Crítico / Repor' : 'Normal'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ABA: TÉCNICOS */}
        {activeTab === 'tecnicos' && (
          <div>
            <h2 style={styles.sectionTitle}>Equipe Técnica</h2>
            
            <form onSubmit={handleAddTec} style={styles.formGrid}>
              <input 
                style={styles.input} 
                placeholder="Nome do Técnico" 
                value={novoTec.nome} 
                onChange={e => setNovoTec({...novoTec, nome: e.target.value})}
                required
              />
              <input 
                style={styles.input} 
                placeholder="Especialidade (Ex: Mecânica, Elétrica)" 
                value={novoTec.especialidade} 
                onChange={e => setNovoTec({...novoTec, especialidade: e.target.value})}
                required
              />
              <button type="submit" style={styles.button}>Cadastrar Técnico</button>
            </form>

            <table style={styles.table}>
              <thead>
                <tr style={styles.trHead}>
                  <th style={styles.th}>Nome</th>
                  <th style={styles.th}>Especialidade</th>
                </tr>
              </thead>
              <tbody>
                {tecnicos.map(tec => (
                  <tr key={tec.id} style={styles.tr}>
                    <td style={styles.td}>{tec.nome}</td>
                    <td style={styles.td}>{tec.especialidade}</td>
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

// Estilos corporativos limpos e funcionais
const styles = {
  container: { fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', color: '#333', paddingBottom: '40px' },
  header: { backgroundColor: '#1e293b', color: '#fff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { margin: 0, fontSize: '22px', fontWeight: '600' },
  subtitle: { fontSize: '13px', color: '#94a3b8' },
  userBadge: { fontSize: '13px', backgroundColor: '#334155', padding: '6px 12px', borderRadius: '4px' },
  nav: { display: 'flex', backgroundColor: '#334155', padding: '0 40px', gap: '10px' },
  navBtn: { background: 'transparent', border: 'none', color: '#94a3b8', padding: '15px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
  navBtnActive: { background: 'transparent', border: 'none', color: '#fff', padding: '15px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', borderBottom: '3px solid #3b82f6' },
  main: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { fontSize: '18px', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' },
  kpiCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' },
  kpiValue: { fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#1e293b' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', backgroundColor: '#fff', padding: '20px', borderRadius: '6px', marginBottom: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px' },
  inputFull: { padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', gridColumn: '1 / -1' },
  button: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  table: { width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  trHead: { backgroundColor: '#e2e8f0', textAlign: 'left' },
  th: { padding: '12px 15px', fontSize: '13px', color: '#475569', fontWeight: '600' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '12px 15px', fontSize: '14px', color: '#334155' },
  badgeGreen: { backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' },
  badgeYellow: { backgroundColor: '#fef9c3', color: '#854d0e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' },
  badgeRed: { backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' },
  smallBtn: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }
};
