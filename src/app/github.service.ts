import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubService {
  public githubUsers: object[] = [];
  public githubRepos: object[] = [];
  private apiURL  = 'https://api.github.com';

  constructor(private http: HttpClient) {
    this.getRepos();
  }

  private getUsers() {
    this.http.get(`${this.apiURL}/users`)
      .subscribe((result: object[]) => {
        if (result.length){
          result.forEach((user) => {
            this.githubUsers.push(user);
          });
        }
      });
  }

  private getRepos() {
    this.http.get(`${this.apiURL}/repositories`)
      .subscribe((result: any[]) => {
        if (result.length) {
          result.some((repo, index, arr) => {
              this.githubRepos.push(repo);
              repo.ownername = repo.owner.login;
              /* Uncomment these lines to avoid api rate restrictions
						  repo.closed_issues = index;
							repo.open_issues = arr.length - index;
							*/
              //comment next line to avoid api rate restrictions
              this.updateWithRepoData (repo, repo.ownername, repo.name);
              // You can increase next limit or return true when previous line is commented
              return index >= 4;
          });
        }
      });
  }

  updateWithRepoData (repo, username, reponame) {
    this.http.get(`${this.apiURL}/repos/${username}/${reponame}/issues?state=closed`)
    .subscribe((result: object[]) => {
        repo.closed_issues = (result && result.length) ? result.length : 0;
    });
    this.http.get(`${this.apiURL}/repos/${username}/${reponame}/issues?state=open`)
    .subscribe((result: object[]) => {
        repo.open_issues = (result && result.length) ? result.length : 0;
    });
  }
}
