import { Test  } from "./models/test.model";
import { MetaData  } from "./models/meta-data.model";
import { Meta } from '@angular/platform-browser';

export interface AppState{
  readonly test : Test[];
  readonly metaData : MetaData;
}
