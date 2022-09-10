//React
import { Component } from "react";

//Services
import { UserService } from "../services/userService";

//Components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default class UserCRUD extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      visible: false,
      visible2: false,
      user: {},
      selectedUser: {},
      // searchBarValue: ""
    };
    this.items = [
      {
        label: "Create",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          this.showEditDialog();
        },
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.delete();
        },
      },
    ];
    this.userService = new UserService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    this.footer2 = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.update} />
      </div>
    );
  }

  componentDidMount() {
    this.userService
      .getAllUser()
      .then((data) => {
        this.setState({
          users: data.map((user) => {
            const temporal = user.id;
            const temporal2 = user.attributes;
            temporal2.id = temporal;
            return temporal2;
          }),
        });
      })
      .catch((error) =>
        this.toast.show({
          severity: "error",
          summary: "Error",
          detail: `${error}`,
        })
      );
  }

  save() {
    this.userService
      .saveUser(this.state.user)
      .then(() => {
        this.setState({
          visible: false,
          user: {},
        });
        this.toast.show({
          severity: "success",
          summary: "Attention",
          detail: "The register has been saved",
        });
        this.userService.getAllUser().then((data) =>
          this.setState({
            users: data.map((user) => {
              const temporal = user.id;
              const temporal2 = user.attributes;
              temporal2.id = temporal;
              return temporal2;
            }),
          })
        );
      })
      .catch((error) =>
        this.toast.show({
          severity: "error",
          summary: "Error",
          detail: `${error}`,
        })
      );
  }

  update() {
    this.userService
      .updateUser(this.state.selectedUser.id, this.state.user)
      .then(() => {
        this.setState({
          visible2: false,
          user: {},
          selectedUser: {},
        });
        this.toast.show({
          severity: "success",
          summary: "Attention",
          detail: "The register has been saved",
        });
        this.userService.getAllUser().then((data) =>
          this.setState({
            users: data.map((user) => {
              const temporal = user.id;
              const temporal2 = user.attributes;
              temporal2.id = temporal;
              return temporal2;
            }),
          })
        );
      })
      .catch((error) =>
        this.toast.show({
          severity: "error",
          summary: "Error",
          detail: `${error}`,
        })
      );
  }

  delete() {
    if (!this.state.selectedUser.id) {
      alert("Seleccione un registro a eliminar");
    } else {
      if (window.confirm("Do you really want to delete the record")) {
        this.userService
          .deleteUser(this.state.selectedUser.id)
          .then(() => {
            this.toast.show({
              severity: "success",
              summary: "Attention!",
              detail: "Register has been deleted",
            });
            this.userService.getAllUser().then((data) =>
              this.setState({
                users: data.map((user) => {
                  const temporal = user.id;
                  const temporal2 = user.attributes;
                  temporal2.id = temporal;
                  return temporal2;
                }),
              })
            );
          })
          .catch((err) => {
            this.toast.show({
              severity: "error",
              summary: "Error!",
              detail: `${err}`,
            });
          });
      }
    }
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      user: {},
      selectedUser: {},
    });
  }

  showEditDialog() {
    if (!this.state.selectedUser.id) {
      alert("Seleccione un usuario para modificar");
    } else {
      this.setState({
        visible2: true,
        user: {
          id: this.state.selectedUser.id,
          nombre: this.state.selectedUser.nombre,
          fecha_de_nacimiento: this.state.selectedUser.fecha_de_nacimiento,
          numero_de_identificacion:
            this.state.selectedUser.numero_de_identificacion,
        },
      });
    }
  }

  render() {
    return (
      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Users CRUD">
          <DataTable
            value={this.state.users}
            paginator={true}
            rows={6}
            selectionMode="single"
            selection={this.state.selectedUser}
            onSelectionChange={(e) => {
              this.setState({ selectedUser: e.value });
            }}
          >
            <Column field="nombre" header="Nombre" />
            <Column field="fecha_de_nacimiento" header="Fecha de nacimiento" />
            <Column
              field="numero_de_identificacion"
              header="Numero de identificación"
            />
          </DataTable>
        </Panel>
        <Dialog
          header="Edit user"
          visible={this.state.visible2}
          style={{ width: "400px" }}
          footer={this.footer2}
          modal={true}
          onHide={() => this.setState({ visible2: false })}
        >
          <form id="user-form">
            <span className="p-float-label" style={{ marginTop: 20 }}>
              <InputText
                type={"text"}
                value={this.state.user.nombre}
                style={{ width: "100%" }}
                id="nombre2"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.nombre = val;

                    return { user };
                  });
                }}
              />
              <label htmlFor="nombre2">Nombre</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                type={"date"}
                placeholder={""}
                value={this.state.user.fecha_de_nacimiento}
                style={{ width: "100%" }}
                id="fecha_de_nacimiento2"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.fecha_de_nacimiento = val;

                    return { user };
                  });
                }}
              />
              <label htmlFor="fecha_de_nacimiento2">Fecha de nacimiento</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                type={"number"}
                value={this.state.user.numero_de_identificacion}
                style={{ width: "100%" }}
                id="numero_de_identificacion2"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.numero_de_identificacion = val;

                    return { user };
                  });
                }}
              />
              <label htmlFor="numero_de_identificacion2">
                Número de identificación
              </label>
            </span>
          </form>
        </Dialog>
        <Dialog
          header="Create user"
          visible={this.state.visible}
          style={{ width: "400px" }}
          footer={this.footer}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <form id="user-form">
            <span className="p-float-label" style={{ marginTop: 20 }}>
              <InputText
                type={"text"}
                value={this.state.user.nombre}
                style={{ width: "100%" }}
                id="nombre"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.nombre = val;

                    return { user };
                  });
                }}
              />
              <label htmlFor="nombre">Nombre</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                type={"date"}
                placeholder={""}
                value={this.state.user.fecha_de_nacimiento}
                style={{ width: "100%" }}
                id="fecha_de_nacimiento"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.fecha_de_nacimiento = val;

                    return { user };
                  });
                }}
              />
              <label htmlFor="fecha_de_nacimiento">Fecha de nacimiento</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                type={"number"}
                value={this.state.user.numero_de_identificacion}
                style={{ width: "100%" }}
                id="numero_de_identificacion"
                onChange={(e) => {
                  let val = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.numero_de_identificacion = val;

                    return { user };
                  });
                }}
              />
              <label htmlFor="numero_de_identificacion">
                Número de identificación
              </label>
            </span>
          </form>
        </Dialog>
        <Toast ref={(el) => (this.toast = el)} />
      </div>
    );
  }
}
