import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserComment, Reply, AppComponent} from '../app.component'
@Component({
  selector: 'app-one-comment',
  templateUrl: './one-comment.component.html',
  styleUrls: ['./one-comment.component.scss']
})
export class OneCommentComponent implements OnInit {
  newCommentText: string = '';

  showEdit: boolean = false;
  showReply: boolean = false;

  @Input() commentInfo!: UserComment | Reply;
  
  //incrementDecrement
  @Output() isIncrementValue = new EventEmitter<{id: number; isIncrement: boolean}>();
  //incrementDecrement

  //delete
  @Output() deleteValue = new EventEmitter<number>();
  //delete

  //replyComment
  @Output() replyText = new EventEmitter<{content: string, id:number}>();
  //replyComment

  constructor() { }

  ngOnInit(): void {
  }

  
  
  isIncrementFunction(isIncrement: boolean = true) {
    this.isIncrementValue.emit({ 
        id: this.commentInfo?.id,
      isIncrement: isIncrement
      });
  }

  deleteFunction() {
    this.deleteValue.emit(this.commentInfo?.id);
  }

  replyFunction(){
    if (this.commentInfo && this.newCommentText){
      this.showReply = !this.showReply;
      this.replyText.emit({  content: this.newCommentText, id: this.commentInfo.id });
    }
    this.newCommentText ='';
  }

  insertCreatedAt(){
    this.newCommentText ="@" + this.commentInfo.user.username + " ";
    this.showReply = !this.showReply;
  }

  isUserCommentType(){
    return typeof this.commentInfo;
  }
  
}
