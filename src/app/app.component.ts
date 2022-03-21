import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

//commentTypes
export type Reply = Omit<UserComment, 'replies'> & { replyingTo: string; };
export interface UserComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    }
    username: string;
  }
  replies: Reply[];
}
//commentTypes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) { }

  newCommentText:string = '';
  allInfo: any = {};
  allComments: UserComment[] = [];

  async load(): Promise<void> {
    this.allInfo = await this.dataService.getUsers();
    this.allComments = this.allInfo.comments;
  };

  public async ngOnInit(): Promise<void> {
    await this.load()
  }

  newComment(){
    const date = new Date();
    const newContent = {
      id: Date.now(),
      content: this.newCommentText,
      createdAt: `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      score: 0,
      user: {
        image: this.allInfo.currentUser.image,
        username: this.allInfo.currentUser.username,
      },
      replies: [],
    }
    this.allComments.push(newContent);
    this.newCommentText = '';
  }


  replyComment(obj: {content: string, id: number}){
    const date = new Date();
    let newContent = {
      id: Date.now(),
      content: obj.content,
      createdAt: `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      replyingTo: '',
      score:0,
      user: {
        image: this.allInfo.currentUser.image,
        username: this.allInfo.currentUser.username,
      }
    }
    for (let i = 0; i < this.allComments.length; i++) {
      if (this.allComments[i].id === obj.id) {
        newContent.replyingTo = this.allComments[i].user.username;
        this.allComments[i].replies?.push(newContent);
      }
  }
}

  scoreController(isIncrement: boolean, comment: UserComment | Reply) {
    if (isIncrement) {
      ++comment.score;
      return;
    }
    if (comment.score > 0) --comment.score;
    return;
  }

  incrementOrDecrementScore(value: { id: number; isIncrement: boolean }) {
    this.allComments.forEach((mainComment: UserComment) => {
      if (mainComment.id == value.id) {
        this.scoreController(value.isIncrement, mainComment);
      }
      mainComment.replies.forEach((reply: Reply) => {
        if (reply.id == value.id) {
        this.scoreController(value.isIncrement, reply);
        }
      });
    });
  }

  deleteComment(id: number){
    this.allComments = this.allComments.filter((comments: UserComment) =>{
      if(comments.replies){
        comments.replies = comments.replies.filter((replyComment: Reply) =>{
          return replyComment.id !== id;
        })
      }
      return comments.id !== id;
    })
  }


}
