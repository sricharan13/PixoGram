import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BlockedAccountsComponent } from './blocked-accounts.component';

describe('BlockedAccountsComponent', () => {
  let component: BlockedAccountsComponent;
  let fixture: ComponentFixture<BlockedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule
      ],
      declarations: [ BlockedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('unblock is null ',()=>{
    expect(component.unblock).toBeNull;
  });

  it('users is null ',()=>{
    expect(component.users).toBeNull;
  });


});
