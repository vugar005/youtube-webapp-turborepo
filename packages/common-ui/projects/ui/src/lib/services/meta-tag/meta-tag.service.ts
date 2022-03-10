import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { ICommonMetaTagConfig } from '../../models/meta-tag-config';

@Injectable({
  providedIn: 'root',
})
export class MetaTagService {
  constructor(private titleService: Title, private metaService: Meta) {}

  public setTags(config: ICommonMetaTagConfig): void {
    const { title, description, image, url } = config;
    if (title) {
      this.titleService.setTitle(title);
      this.metaService.updateTag({ name: 'title', content: title });
      this.metaService.updateTag({ name: 'og:title', content: title });
      this.metaService.updateTag({ name: 'twitter:title', content: title });
      this.metaService.updateTag({ name: 'twitter:text:title', content: title });
    }

    if (description) {
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ name: 'og:description', content: description });
      this.metaService.updateTag({ name: 'twitter:description', content: description });
    }

    if (image) {
      this.metaService.updateTag({ name: 'og:image', content: image });
      this.metaService.updateTag({ name: 'twitter:image:src', content: image });
      this.metaService.updateTag({ name: 'twitter:image:thumbnail:src', content: image });
    }

    if (url) {
      this.metaService.updateTag({ name: 'og:url', content: url });
      this.metaService.updateTag({ name: 'twitter:url', content: url });
    }
  }
}
