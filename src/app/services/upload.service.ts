import { Upload } from './../models/upload.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { GalleryImage } from './../models/galleryImage.model';
import { AngularFireModule } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

  private basePath = '/uploads';
  private uploads: FirebaseListObservable<GalleryImage[]>;

  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase) { }

  uploadFile (upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED),
      // three observers
      // 1. state_changed observer
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.totalBytes) * 100;
      },
      // 2. error observer
      (error) => {
        console.error(error);
      },
      // 3. success observer
      (): any => {
        upload.url = uploadTask.snapshot.downloadURL;
        this.saveFileData(upload);
      };
  };

  // private saveFileData (upload: Upload)

}
