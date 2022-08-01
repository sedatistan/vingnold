import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogServiceProxy } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.scss']
})
export class HomePageAdminComponent implements OnInit {

  blogs: any[] = [];

  constructor(private blogServiceProxy: BlogServiceProxy, private router: Router) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogServiceProxy.getBlogs().subscribe((result: any) => {
      debugger;
      this.blogs = result;
    })
  }

  routeBlog(blogId?: any) {
    if (blogId) {
      this.router.navigate(["/blog-detail-admin", blogId]);
    } else {
      this.router.navigate(["/blog-detail-admin"]);
    }

  }

  deleteBlog(blogId: number) {
    this.blogServiceProxy.deleteBlog(blogId).subscribe(() => {
    })
  }


}
