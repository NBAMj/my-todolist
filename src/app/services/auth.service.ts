import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { TasksDisplayService } from './tasks-display.service';
import { List } from '../Models/List';
import { Task } from '../Models/Task';
import { TasksOperationService } from './tasks-operation.service';
import { UploadFileService } from './upload-file.service';
import { UserProfile } from '../Models/user-profile';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ============================= Properties ============================= //

  s_error: any;
  s_currentUID: string;
  s_currentUserEmail: string;
  s_currentUser



  s_lists: List[];
  s_list: List = {
    listId: '',
    listName: '',
    UID: '',
  }

  userProfiles: UserProfile[];
  userProfile: UserProfile = {
    profileId: '',
    UID: '' ,
    displayName: '',
    imageUrl: '',
    status:'',

  }

  
  // ============================= Functions ============================= //

  // ----- Service Constructor ----- //
  constructor(public afa: AngularFireAuth, public tasksDisplayService: TasksDisplayService, public tasksOperationService: TasksOperationService, public uploadFileService : UploadFileService ,public router: Router) { }

  // ----- Service Signup With Email ----- //
  public s_signupWithEmail(email: string, password: string) {

    this.afa.auth.createUserWithEmailAndPassword(email, password).then(
      (success) => {
        this.router.navigateByUrl('/components/login-page'); //promise
        this.s_currentUID = this.afa.auth.currentUser.uid;
        this.s_currentUserEmail= this.afa.auth.currentUser.email;
        this.userProfile = {UID: this.s_currentUID, displayName: this.s_currentUserEmail, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/webappauth-b9c2a.appspot.com/o/uploads%2Fperson-icon.png?alt=media&token=902b2b2a-0bde-4ca8-ab8d-3dcfd9f16c95', status: 'I can do it'};
        this.s_list = { listName: "My Day", UID: this.s_currentUID }
        this.uploadFileService.addUserProfile(this.userProfile);
        this.tasksOperationService.addList(this.s_list);
      }).catch(
        (err) => {
          this.s_error = err.message;
        }
      ) //promise --> then,catch
  }


  // ----- Service Signup With Google ----- //
  public s_signupWithGoogle() {

    this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider).then(

      (success) => {
        this.router.navigateByUrl('/components/side-nav');
        this.s_currentUID = this.afa.auth.currentUser.uid;
        console.log(this.s_currentUID);

      }).catch(
        (err) => {
          this.s_error = err.message;
        }
      );
  }

  // ----- Service Login With Email ----- //
  public s_loginWithEmail(email, password) {
    this.afa.auth.signInWithEmailAndPassword(email, password).then(
      (success) => {
        this.s_currentUser = this.afa.auth.currentUser;
        this.s_currentUID = this.s_currentUser.uid; //change cuurent user id 
        this.s_currentUserEmail = this.s_currentUser.email;
        console.log("user email "+ this.s_currentUserEmail);
        this.router.navigateByUrl('/components/side-nav');
      }).catch(
        (err) => {
          this.s_error = err.message;
        }
      );
  }

  // ----- Service Reset Password ----- //
  public s_resetPassword(email: string) {
    return this.afa.auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((err) => {

        this.s_error = err.message;
      }
      );

  }
  // ----- Service Logout ----- //
  public S_logout() {
    this.afa.auth.signOut();

  }
}
