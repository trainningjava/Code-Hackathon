const arrowleft = document.querySelector(".arrow-left");
arrowleft.addEventListener("click", getQtdDias);

const arrowright = document.querySelector(".arrow-right");
arrowright.addEventListener("click", getQtdDias1);

function getQtdDias() {
  const qtd = document.querySelector(".qtddias");
  if (qtd.innerHTML > 0) {
    qtd.innerHTML--;
  }
}

function getQtdDias1() {
  const qtd = document.querySelector(".qtddias");
  if (qtd.innerHTML < 31) {
    qtd.innerHTML++;
  }
}
