import { HttpClient, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseUrl } from 'src/app/interfaces/baseUrl';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  progress: number=0;
  message: string='';

  @Output() public onUploadFinished = new EventEmitter();
  
 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
 
  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);


    this.http.post(BaseUrl()+"users/upload", formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
        {
        let total:any=event.total;
          this.progress = Math.round(100 * event.loaded / total);
        }
          else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}
