
import { MetaData  } from './models/meta-data.model';
import { QsMetaData  } from './models/qs-meta-data.model';
import { Meta } from '@angular/platform-browser';

export interface AppState {
  readonly metaData: MetaData;
  readonly qsMetaData: QsMetaData;
}
