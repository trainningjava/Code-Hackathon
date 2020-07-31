google.charts.load("current", { packages: ["corechart"] });

function desenharPizza() {
  var tabela = new google.visualization.DataTable();
  tabela.addColumn("string", "categorias");
  tabela.addColumn("number", "valores");
  tabela.addRows([
    ["Televisão", 70],
    ["Lampada", 50],
    ["Chuveiro", 500],
  ]);

  var grafico = new google.visualization.PieChart(
    document.getElementById("graficoPizza")
  );
  grafico.draw(tabela);
}

google.charts.setOnLoadCallback(desenharPizza);
