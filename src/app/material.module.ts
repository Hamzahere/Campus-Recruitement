import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';




@NgModule({
    imports: [MatButtonModule, MatRadioModule,MatListModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatFormFieldModule,MatInputModule],
    exports: [MatButtonModule, MatRadioModule,MatListModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatFormFieldModule,MatInputModule]
  })
export class MaterialModule{

}