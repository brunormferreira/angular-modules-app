import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messagesSubject$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  public messages$: Observable<string[]> = this.messagesSubject$.asObservable();

  public getMessages(): Observable<string[]> {
    return this.messages$;
  }

  public addMessage(message: string): void {
    this.messagesSubject$.next([...this.messagesSubject$.getValue(), message]);
  }

  public clearMessages(): void {
    this.messagesSubject$.next(null!);
  }
}
