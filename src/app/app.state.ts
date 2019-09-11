
import { MetaData  } from './models/meta-data.model';
import { QsMetaData  } from './models/qs-meta-data.model';
import { AuthState } from './reducers/auth-reducer';
import { ClaimsState } from './reducers/claims-reducer';

export interface AppState {
  readonly metaData: MetaData;
  readonly qsMetaData: QsMetaData;
  readonly   authState : AuthState;
  readonly   claimsState : ClaimsState;

}
