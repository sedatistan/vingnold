import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceProxy } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'app-blog-detail-admin',
  templateUrl: './blog-detail-admin.component.html',
  styleUrls: ['./blog-detail-admin.component.scss']
})
export class BlogDetailAdminComponent implements OnInit {

  blogId: any;
  blog: any;
  updateForm: FormGroup;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute, private blogServiceProxy: BlogServiceProxy, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      blogContent: ['', Validators.required],
      blogTitle: ['', Validators.required],
      blogPublished: ['', Validators.required],
      blogDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {
debugger;
    this.blogId = this.activatedRoute.snapshot.params["blogId"];
    if (this.blogId) {
      this.blogId = +this.blogId
      this.getBlog(this.blogId);
    }

  }

  get f() { return this.updateForm.controls; }

  loadBlogData() {
    debugger;
    this.updateForm.setValue({
      blogContent: this.blog.content,
      blogTitle: this.blog.title,
      blogPublished: new Date(this.blog.published_at),
      blogDescription: this.blog.description
    })
  }

  getBlog(blogId: number) {
    this.blogServiceProxy.getBlog(blogId).subscribe(result => {
      debugger;
      this.blog = result;
      this.loadBlogData();
    })
  }

  updateBlog() {
    this.blogServiceProxy.updateBlog(this.blog).subscribe(() => {

    })
  }

  createBlog() {
    this.blogServiceProxy.createBlog(this.blog).subscribe(() => {

    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }
    if (this.blogId) {
      this.updateBlog();
    } else {

    }

  }

}
