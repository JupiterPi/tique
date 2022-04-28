import { Component } from '@angular/core';

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.css']
})
export class TagsViewComponent {
  tags = [
    {
      name: "Tag 1",
      icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Cerwen der Dunkle",
      icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Tag 3 with a really long name",
      icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
    }
  ];
}
