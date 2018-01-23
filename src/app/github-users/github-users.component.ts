import { Component, OnInit } from '@angular/core';
import {GithubService} from '../github.service';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.css']
})
export class GithubUsersComponent implements OnInit {

	static compareNumbers(prev, next, asc) {
		if (prev === next){
			return 0;
		}
		if ((prev > next && asc) ||(prev < next && !asc)){
			return 1
		}
		if ((prev < next && asc) ||(prev > next && !asc)){
			return -1
		}
	}
  private _gitHubRepos:  object[];
  public isClosedSorted: boolean = false;
	public isOpenSorted: boolean = false;
	public sortOrdAsc: boolean = true;
	public ownerStr: string = '';

  constructor(private githubService: GithubService) {
    this._gitHubRepos = githubService.githubRepos;
  }

  ngOnInit() {
  }
	get gitHubRepos(): object[] {
		return this._gitHubRepos.filter((element: any) => {
			if (this.ownerStr){
				return element.ownername.includes(this.ownerStr);
			} else {
				return true;
			}
		})
			.sort((prev: any, next: any) => {
				if (this.isClosedSorted){
					return GithubUsersComponent.compareNumbers(prev.closed_issues, next.closed_issues, this.sortOrdAsc);
				} else if (this.isOpenSorted){
					return GithubUsersComponent.compareNumbers(prev.open_issues, next.open_issues, this.sortOrdAsc);
				} else {
					return 0;
				}
			});
	}
  changeSort(element) {
		switch(element) {
			case 'closed':
				if (this.isClosedSorted){
					this.sortOrdAsc = !this.sortOrdAsc;
				} else {
					this.isClosedSorted = true;
					this.isOpenSorted = false;
				}
				break;
			case 'open':
				if (this.isOpenSorted){
					this.sortOrdAsc = !this.sortOrdAsc;
				} else {
					this.isClosedSorted = false;
					this.isOpenSorted = true;
				}
				break;
			default:
				this.isClosedSorted = false;
				this.isOpenSorted = false;
				break
		}
  }
}
