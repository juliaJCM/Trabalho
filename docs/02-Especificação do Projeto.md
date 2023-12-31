# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Gabriel Barbosa <br>
Idade: 26 anos <br>
Profissão: Arquiteto autônomo <br>
Estado Civil: Solteiro <br>
Metas Financeiras: Realizar um mestrado no exterior, fazer intercâmbio e viajar pelo mundo. <br>
Descrição: Gabriel é um jovem arquiteto autônomo com ambições acadêmicas e pessoais. Ele está determinado a realizar um mestrado no exterior e explorar o mundo através de viagens. Para alcançar essas metas financeiras, ele precisa de uma ferramenta que o ajude a economizar, controlar gastos e planejar financeiramente.

Ana Clara <br>
Idade: 30 anos <br>
Profissão: Gerente de marketing <br>
Estado Civil: Casada <br>
Metas Financeiras: Economizar para comprar uma casa e planejar a educação dos filhos. <br>
Descrição: Ana Clara é uma profissional experiente que prioriza a estabilidade financeira para criar um lar confortável para sua família. Suas metas incluem a compra de uma casa e o planejamento da educação de seus filhos. Ela busca uma solução que a ajude a controlar despesas, economizar e investir para o futuro.

Soares dos Santos <br>
Idade: 20 anos <br>
Profissão: Estudante universitário em meio período <br>
Estado Civil: Solteiro <br>
Metas Financeiras: Gerenciar seu orçamento estudantil e economizar para futuros estudos. <br>
Descrição: Soares dos Santos é um estudante universitário que precisa equilibrar suas finanças enquanto se concentra nos estudos. Ele deseja economizar para futuros estudos e precisa de uma solução simples e acessível para controlar suas finanças enquanto administra seu orçamento de estudante.

Isabel <br>
Idade: 45 anos <br>
Profissão: Advogada <br>
Estado Civil: Casada <br>
Metas Financeiras: Planejar a aposentadoria, investir em imóveis e pagar a faculdade dos filhos. <br>
Descrição: Isabel é uma advogada experiente com múltiplas responsabilidades financeiras, desde o planejamento de sua aposentadoria até o apoio à educação de seus filhos. Ela busca uma solução completa e eficiente que a ajude a gerenciar suas finanças, investimentos e metas financeiras de longo prazo.

## Histórias de Usuários

| EU COMO...              | QUERO/PRECISO...                                      | PARA...                                   | MOTIVO/VALOR                               |
|-------------------------|-------------------------------------------------------|-------------------------------------------|--------------------------------------------|
| Gabriel Barbosa         | Registrar despesas de forma simples e rápida, categorizando-as | Acompanhar o orçamento e economizar para estudos e viagens | Evitar gastos excessivos e atingir metas financeiras. |
|                       | Definir metas de economia mensais para objetivos de estudos e viagens | Atingir metas financeiras de longo prazo  | Planejar financeiramente para objetivos pessoais. |
|                       | Receber notificações ou lembretes sobre datas de vencimento de despesas/metas | Evitar esquecimentos e manter prazos importantes | Gerenciar com eficácia os pagamentos e metas financeiras. |
| Ana Clara               | Configurar planejamento financeiro para comprar casa e planejar educação dos filhos | Alcançar metas de longo prazo          | Garantir estabilidade financeira para a família. |
|                       | Visualizar relatórios e gráficos do patrimônio líquido | Tomar decisões financeiras informadas    | Monitorar o progresso financeiro e tomar decisões embasadas. |
| Soares dos Santos       | Gerenciar gastos relacionados à educação, incluindo mensalidades e materiais | Manter finanças sob controle             | Evitar gastos desnecessários e focar nos estudos. |
|                       | Automatizar a categorização de despesas relacionadas à educação | Facilitar o acompanhamento financeiro     | Economizar tempo e esforço no gerenciamento financeiro. |
| Isabel                | Importar dados de investimentos para acompanhar o portfólio financeiro | Consolidar informações financeiras      | Manter um registro completo de investimentos. |
|                       | Definir orçamentos para despesas dos filhos e receber alertas | Controlar e planejar despesas familiares | Garantir uma gestão financeira eficaz da família. |

## Requisitos

| ID     | Descrição do Requisito                                    | Prioridade |
|--------|---------------------------------------------------------|------------|
| RF-001 | Permitir que o usuário cadastre despesas e metas pessoais | ALTA       |
| RF_002 | Facilitar o registro de despesas de forma simples e rápida, permitindo categorização | MÉDIA      |
| RF-003 | Possibilitar que o usuário defina metas de economia mensais para seus objetivos financeiros | ALTA       |
| RF-004 | Permitir que o usuário receba notificações ou lembretes sobre datas de vencimento de despesas ou metas financeiras | BAIXA       |
| RF-005 | Oferecer uma função de planejamento financeiro de longo prazo para objetivos como comprar uma casa ou planejar qualquer demanda| ALTA       |
| RF-006 | Disponibilizar relatórios e gráficos que mostrem a evolução do patrimônio líquido do usuário | MÉDIA      |
| RF-007 | Possibilitar o gerenciamento de gastos, incluindo mensalidades | ALTA       |
| RF-008 | Implementar um recurso de categorização automática de despesas | MÉDIA      |
| RF-009 | Permitir que o usuário defina orçamentos para despesas e receba alertas quando esses orçamentos estiverem prestes a serem atingidos | BAIXA      |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| O sistema deve suportar uma quantidade necessaria de usuarios |  ALTA | 
|RNF-003| O sistema deve estar disponível 24 horas por dia |  ALTA | 
|RNF-004| O sistema deve ser acessivel a todos |  MEDIA | 
|RNF-004| O sistema deve ser resposivo |  MEDIA | 
|RNF-004| O sistema deve ser capaz de funcionar Offiline |  BAIXA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Deverá ser desenvolvido usando back-end e front-end   |
|03| Deve garantir que os dados sejam armazenados de maneira responsável  |
|04| Deverá responder rapidamente a consultas e ações do usuário   |
|05| Deverá ser compatível com as principais plataformas móveis   |

## Diagrama de Casos de Uso

![Casos de uso](img/casosUso.png)


# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
