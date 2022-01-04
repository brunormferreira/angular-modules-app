import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messagesSubject$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  public messages$: Observable<string[]> = this.messagesSubject$.asObservable();

  getMessages(): Observable<string[]> {
    return this.messages$;
  }

  add(message: string): void {
    this.messagesSubject$.next(
      this.messagesSubject$.getValue().concat(message)
    );
  }

  clear(): void {
    this.messagesSubject$.next(null!);
  }
}
