import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FileLogDto} from "./fileLogDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  public getCurrentListOfFiles(): Observable<FileLogDto[]> {
    return this.httpClient.get<FileLogDto[]>("http://localhost:8080/api/file/files");
  }

  public getFileResourceUrl(fileId: string) {
    return 'http://localhost:8080/api/file/download?fileId=' + fileId;
  }

  public convertCSV(fileId: string): Observable<string> {
    return this.httpClient.post<string>("http://localhost:8080/api/file/convert?fileId="+ fileId +"&targetFileType=PDF", null) ;
  }
}
