import {Component, OnInit} from '@angular/core';
import {FileService} from "./file.service";
import {FileLogDto} from "./fileLogDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'momentum-investments-ui';

  public files: FileLogDto[] = [];
  constructor(private fileService:FileService) {
  }

  ngOnInit() {
    this.getListOfFiles();
  }

  private getListOfFiles() {
    this.fileService.getCurrentListOfFiles().subscribe(files => this.files = files);
  }

  public download(fileId: string, originalFileName: string) {
    let link = document.createElement("a");
    link.download = originalFileName;
    link.href = this.fileService.getFileResourceUrl(fileId);
    link.click();
  }

  public toPdf(fileId: string) {
    this.fileService.convertCSV(fileId).subscribe(fileId => {
      this.download(fileId, fileId + ".pdf");
      this.getListOfFiles();
    });
  }
}
