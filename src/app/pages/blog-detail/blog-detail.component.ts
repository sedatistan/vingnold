import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceProxy } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogId: any;
  blog: any;

  constructor(private activatedRoute: ActivatedRoute, private blogServiceProxy: BlogServiceProxy) { }

  ngOnInit(): void {
    this.blogId = this.activatedRoute.snapshot.params["blogId"];
    this.blogId=+this.blogId
    this.getBlog(this.blogId);
  }

  getBlog(blogId: number) {
    this.blogServiceProxy.getBlog(blogId).subscribe(result => {
      debugger;
      this.blog = result;
    })
  }

}
