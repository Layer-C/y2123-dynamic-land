import * as B from "babylonjs";

export class CustomLoadingScreen implements B.ILoadingScreen {
  public loadingUIBackgroundColor!: string;
  constructor(public loadingUIText: string) {}

  public displayLoadingUI() {
    let customLoadingScreenCss = document.createElement("style");
    customLoadingScreenCss.id = "loading-style-tag";
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #FFFFFFcc;
        color: grey;
        font-size:12px;
        text-align:center;
        font-family: Helvetica;
    }
    `;
    document.getElementsByTagName("head")[0].appendChild(customLoadingScreenCss);

    let _loadingDiv = document.createElement("div");
    _loadingDiv.id = "customLoadingScreenDiv";
    _loadingDiv.innerHTML = "<img src='Loadingsome.gif' />";
    document.body.insertBefore(_loadingDiv, document.getElementById("renderCanvas"));
  }

  public hideLoadingUI() {
    let elem = document.getElementById("customLoadingScreenDiv");
    elem!.parentNode!.removeChild(elem!);

    elem = document.getElementById("loading-style-tag");
    elem!.parentNode!.removeChild(elem!);
  }

  updateLoadStatus(status: string): void {
    let elem = document.getElementById("customLoadingScreenDiv");
    elem!.innerHTML = `<img src='Loadingsome.gif' /><h1>${status}%</h1>`;
  }
}
