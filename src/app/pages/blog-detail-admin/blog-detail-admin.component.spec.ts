import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailAdminComponent } from './blog-detail-admin.component';

describe('BlogDetailAdminComponent', () => {
  let component: BlogDetailAdminComponent;
  let fixture: ComponentFixture<BlogDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDetailAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
