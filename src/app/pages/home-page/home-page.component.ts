import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogServiceProxy } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  blogs: any[] = [];

  constructor(private blogServiceProxy: BlogServiceProxy, private router: Router) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogServiceProxy.getBlogs().subscribe((result: any) => {
      this.blogs = result;
    })
  }

  routeBlog(blogId: any) {
    this.router.navigate(["/blog-detail", blogId])
  }

}
