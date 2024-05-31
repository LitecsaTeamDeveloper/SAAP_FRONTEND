export interface Inventario {
    idInventario:  number; 
    rfid:  string; 
    idNumeroParte:  number; 
    numeroParte:  string; 
    idCompania:  number; 
    compania:  string; 
    descripcion:  string; 
    idDiametroInterior:  number; 
    diametroInterior:  string; 
    idDiametroExterior:  number; 
    diametroExterior:  string; 
    longitud:  number; 
    idRango:  number; 
    rango: string ; 
    esNuevo:  boolean; 
    bending:  number; 
    idEstatus:  number; 
    estatus:  string; 
    fechaIngreso:  Date; 
}
