import * as React from "react";

export function SystemUnavailablePageUI() {

  return (<div id="main-wrapper">
    <div id="content-wrapper">
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="alert alert-danger null">Системата е временно недостъпна, моля опитайте отново по-късно.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
