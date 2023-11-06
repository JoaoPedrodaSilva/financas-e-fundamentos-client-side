import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const GraficoDRE = ({ dadosCadastrais, historicoValores }) => {

    //states
    const cores = ["#ccccff", "#9999ff", "#6666ff", "#3232ff", "#0000ff"]
    const [dadosFinanceiros, setDadosFinanceiros] = useState(null)


    useEffect(() => {
        !dadosCadastrais.instituicao_financeira && !dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Receita Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: true
            },
            {
                label: "Lucro Bruto",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: true
            },
            {
                label: "Lucro Operacional (EBIT)",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false
            },
            {
                label: "Lucro Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[4],
                borderColor: cores[4],
                hidden: false
            }]
        })

        dadosCadastrais.instituicao_financeira && !dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Receita Líquida",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.receitaLiquida),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: true
            },
            {
                label: "Lucro Bruto",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroBruto),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false
            },
            {
                label: "Lucro Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[3],
                borderColor: cores[3],
                hidden: false
            }]
        })

        dadosCadastrais.holding && setDadosFinanceiros({
            labels: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.ano.getFullYear()),
            datasets: [{
                label: "Lucro Operacional",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroOperacional),
                backgroundColor: cores[0],
                borderColor: cores[0],
                hidden: false
            },
            {
                label: "Lucro Antes dos Tributos",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroAntesTributos),
                backgroundColor: cores[1],
                borderColor: cores[1],
                hidden: false
            },
            {
                label: "Lucro Líquido",
                data: historicoValores.map(exercicioFinanceiro => exercicioFinanceiro.lucroLiquido),
                backgroundColor: cores[2],
                borderColor: cores[2],
                hidden: false
            }]
        })
    }, [dadosCadastrais])


    return (
        <div className='w-full'>
            {dadosFinanceiros &&
                <Bar
                    className='bg-[url(https://financas-e-fundamentos.s3.sa-east-1.amazonaws.com/ff-coin-opacity-10.png)] bg-center bg-no-repeat'
                    data={dadosFinanceiros}
                    options={{
                        responsive: true,
                        borderWidth: 0,
                        borderRadius: 10,
                        categoryPercentage: .7,
                        barPercentage: 1,
                        interaction: {
                            mode: 'index'
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: "white",
                                },
                                grid: {
                                    // color: "rgba(255,255,255,0.05)",
                                    display: false,
                                    // drawBorder: false
                                }
                            },
                            y: {
                                position: 'right',
                                ticks: {
                                    maxTicksLimit: 6,
                                    color: "white",
                                    callback: value => value.toLocaleString("pt-BR")
                                },
                                title: {
                                    display: true,
                                    text: "Milhões de R$",
                                    color: "white"
                                },
                                grid: {
                                    color: "rgba(255,255,255,0.05)"
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context => `${context.dataset.label}: R$ ${context.raw.toLocaleString("pt-BR")} milhões`,
                                    labelTextColor: context => context.raw < 0 ? "red" : "white"
                                }
                            },
                            legend: {
                                labels: {
                                    padding: 25,
                                    color: "white"
                                }
                            },
                            plugins: {
                                colors: {
                                    forceOverride: true
                                }
                            }
                        }
                    }}
                />
            }
        </div>
    )
} 