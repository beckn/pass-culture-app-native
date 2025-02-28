import { ContentTypes } from 'libs/contentful'
import { thematicCategoryInfoFixture } from 'libs/contentful/fixtures/thematicCategoryInfo.fixture'
import { thematicHighlightInfoFixture } from 'libs/contentful/fixtures/thematicHighlightInfo.fixture'

export const homepageEntriesAPIResponse = {
  sys: { type: 'Array' },
  total: 2,
  skip: 0,
  limit: 100,
  items: [
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
        id: '6DCThxvbPFKAo04SVRZtwY',
        type: 'Entry',
        createdAt: '2020-07-02T13:36:02.919Z',
        updatedAt: '2020-10-30T10:07:29.549Z',
        environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
        revision: 154,
        contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'homepageNatif' } },
        locale: 'en-US',
      },
      fields: {
        modules: [
          { sys: { type: 'Link', linkType: 'Entry', id: 'KiG6rWuQYhHuGIBXZNeB2' } },
          { sys: { type: 'Link', linkType: 'Entry', id: 'GlQb8Zg3n1PoYVmOyVCgW' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '5u3NaFTcu2XR5KgJ1OAg8C' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '1LgDMVOKdH3agA0WG2LFEr' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '3AbfVZZIZhfvSfGxJSrSqe' } },
          { sys: { type: 'Link', linkType: 'Entry', id: 'K2yYJkeX30OoepIooo2Um' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '24FUVnnPPJ9v7JHkO7eaXK' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '24FUVnnPPJ9v7JHkO7eaID' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '3HnwRT9WtAl8pxywz83sX3' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '2Fjxhdirgh17ZvdPNZGDP4' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '7c7xq3ulzqO2yDRJLDmths' } },
          { sys: { type: 'Link', linkType: 'Entry', id: '6lk6vCol5Qza2mfdtsTzW' } },
        ],
        title: 'Page d’accueil de la webappp',
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
        id: '7IuIeovqUykM1uvWwwPPh8',
        type: 'Entry',
        createdAt: '2020-10-28T17:32:42.192Z',
        updatedAt: '2020-10-28T17:32:42.192Z',
        environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
        revision: 1,
        contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'homepageNatif' } },
        locale: 'en-US',
      },
      fields: {
        modules: [{ sys: { type: 'Link', linkType: 'Entry', id: '24FUVnnPPJ9v7JHkO7eaXK' } }],
        title: 'Homepage test démo août 2020',
        thematicHeaderTitle: 'cinéma',
        thematicHeaderSubtitle: 'Fais le plein de cinéma',
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
        id: '7IuIeovqUykM1uvWwwPPh9',
        type: 'Entry',
        createdAt: '2020-10-28T17:32:42.192Z',
        updatedAt: '2020-10-28T17:32:42.192Z',
        environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
        revision: 1,
        contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'homepageNatif' } },
        locale: 'en-US',
      },
      fields: {
        modules: [],
        title: 'Homepage temps fort',
        thematicHeader: thematicHighlightInfoFixture,
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
        id: '7IuIeovqUykM1uvWwwPPh9',
        type: 'Entry',
        createdAt: '2020-10-28T17:32:42.192Z',
        updatedAt: '2020-10-28T17:32:42.192Z',
        environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
        revision: 1,
        contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'homepageNatif' } },
        locale: 'en-US',
      },
      fields: {
        modules: [],
        title: 'Home catégorielle',
        thematicHeader: thematicCategoryInfoFixture,
      },
    },
  ],
  errors: [
    {
      sys: { id: 'notResolvable', type: 'error' },
      details: { type: 'Link', linkType: 'Entry', id: '2mNCevAITEXz1x2jmU6D93' },
    },
    {
      sys: { id: 'notResolvable', type: 'error' },
      details: { type: 'Link', linkType: 'Entry', id: '47xLfJ1lrW3C3zdFXtWCEn' },
    },
    {
      sys: { id: 'notResolvable', type: 'error' },
      details: { type: 'Link', linkType: 'Entry', id: '5aZ5VXMnYlWbqXh8Klq2Ul' },
    },
  ],
  includes: {
    Entry: [
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: 'KiG6rWuQYhHuGIBXZNeB2',
          type: 'Entry',
          createdAt: '2020-10-30T10:07:22.489Z',
          updatedAt: '2020-10-30T10:07:22.489Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.EXCLUSIVITY },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Exclusitivité du moment',
          alt: 'Exclusitivité du moment',
          image: { sys: { type: 'Link', linkType: 'Asset', id: '2qTXOFUocq1HhgB7Wzl23K' } },
          offerId: '317',
          displayParameters: {
            sys: {
              contentType: {
                sys: {
                  id: ContentTypes.EXCLUSIVITY_DISPLAY_PARAMETERS,
                  linkType: 'ContentType',
                  type: 'Link',
                },
              },
              createdAt: '2021-02-24T14:22:44.717Z',
              environment: { sys: { id: 'testing', linkType: 'Environment', type: 'Link' } },
              id: 'SeAbW1XVKWDJodP3Vu7Y0',
              locale: 'en-US',
              revision: 2,
              space: { sys: { id: '2bg01iqy0isv', linkType: 'Space', type: 'Link' } },
              type: 'Entry',
              updatedAt: '2021-07-02T09:43:22.459Z',
            },
            fields: {
              title: 'Rayon 20km',
              isGeolocated: true,
              aroundRadius: 20,
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: '2bg01iqy0isv',
            },
          },
          id: '6LLWQtNaFQLoFSy8FLYRMB',
          type: 'Entry',
          createdAt: '2023-02-02T15:15:12.133Z',
          updatedAt: '2023-02-02T17:06:46.116Z',
          environment: {
            sys: {
              id: 'testing',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'categories',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Test Eve Catégories',
          categories: ['Instruments de musique', 'Musique'],
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '1JprSqCDtqiIST2Y6k40W2',
          type: 'Entry',
          createdAt: '2020-08-29T07:45:46.830Z',
          updatedAt: '2020-08-29T07:57:20.653Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 2,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          title: 'Week-end',
          beginningDatetime: '2020-09-11T00:01+02:00',
          endingDatetime: '2020-09-12T23:59+02:00',
          hitsPerPage: 30,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '1LgDMVOKdH3agA0WG2LFEr',
          type: 'Entry',
          createdAt: '2020-08-13T08:51:02.376Z',
          updatedAt: '2020-10-12T09:58:02.410Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 4,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          title: '[Tout le temps] Offres du moment',
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '6L8Dpdp9wLRTnmyIdpErXT' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '4TLmm3GKuj3U6QEC8Rd90F' },
          },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '1QEiCosX8czkjnxf5CTsvR',
          type: 'Entry',
          createdAt: '2020-10-12T09:58:37.660Z',
          updatedAt: '2020-10-28T17:38:37.435Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 14,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Pour bien commencer...',
          tags: ['\tstarter_pack_rentree'],
          hitsPerPage: 10,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '24FUVnnPPJ9v7JHkO7eaXK',
          type: 'Entry',
          createdAt: '2020-10-28T17:32:47.396Z',
          updatedAt: '2020-10-28T17:32:47.396Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.BUSINESS },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'FAQ pass Culture',
          firstLine: 'En savoir plus sur le pass Culture',
          secondLine: 'Consulte notre FAQ\u00a0!',
          image: { sys: { type: 'Link', linkType: 'Asset', id: '6kgALLZ7PL6vYubjvE8s0c' } },
          url: 'https://passculture.zendesk.com/hc/fr/',
          targetNotConnectedUsersOnly: true,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '24FUVnnPPJ9v7JHkO7eaID',
          type: 'Entry',
          createdAt: '2020-10-28T17:32:47.396Z',
          updatedAt: '2020-10-28T17:32:47.396Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.BUSINESS },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Crée un compte\u00a0!',
          firstLine: 'Crée un compte\u00a0!',
          secondLine: 'Si tu as 18 ans, bénéficie de 300\u00a0€.',
          image: { sys: { type: 'Link', linkType: 'Asset', id: '6kgALLZ7PL6vYubjvE8s0c' } },
          url: 'https://passculture.zendesk.com/hc/fr/',
          targetNotConnectedUsersOnly: false,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '27aIcxqppovf2ChsaFjOQ5',
          type: 'Entry',
          createdAt: '2020-08-29T07:45:59.469Z',
          updatedAt: '2020-08-29T07:45:59.469Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: { layout: 'two-items', minOffers: 2, title: 'A faire ce week-end\u00a0!' },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '2D1zzvbb4KOaM2ydQrIKi7',
          type: 'Entry',
          createdAt: '2020-10-14T12:29:22.431Z',
          updatedAt: '2020-10-14T14:17:28.874Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 2,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'information' } },
          locale: 'en-US',
        },
        fields: {
          title: 'MBappé',
          image: { sys: { type: 'Link', linkType: 'Asset', id: 'bRKhK9wmpNkD6l5Zeo71J' } },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '2Fjxhdirgh17ZvdPNZGDP4',
          type: 'Entry',
          createdAt: '2020-10-12T20:45:22.062Z',
          updatedAt: '2020-10-14T12:28:36.910Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 3,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          title: 'Sélection MBappé',
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '2VE6YV7Hyxbo9Tz3fn1vTM' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: 'eLESwUjpZNqJyn9haXWGt' },
          },
          cover: { sys: { type: 'Link', linkType: 'Entry', id: '2D1zzvbb4KOaM2ydQrIKi7' } },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '2VE6YV7Hyxbo9Tz3fn1vTM',
          type: 'Entry',
          createdAt: '2020-10-12T20:39:46.191Z',
          updatedAt: '2020-10-12T20:46:20.548Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 3,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: { title: 'Sélection Mbappé', tags: ['foot'], hitsPerPage: 2 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '2fqphBLJADhOYkkzPHvzcT',
          type: 'Entry',
          createdAt: '2020-07-28T14:19:35.878Z',
          updatedAt: '2020-10-12T20:12:43.399Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 31,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: { title: 'A faire à deux', layout: 'two-items', minOffers: 2 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '3AbfVZZIZhfvSfGxJSrSqe',
          type: 'Entry',
          createdAt: '2020-08-29T07:46:18.978Z',
          updatedAt: '2020-08-29T07:46:18.978Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '1JprSqCDtqiIST2Y6k40W2' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '27aIcxqppovf2ChsaFjOQ5' },
          },
          title: '[Vendredi][Samedi] A faire ce week-end',
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '3HnwRT9WtAl8pxywz83sX3',
          type: 'Entry',
          createdAt: '2020-07-28T14:20:02.516Z',
          updatedAt: '2020-08-11T17:06:05.805Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 12,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '41LC4UqDFJcMihS5uELawU' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '2fqphBLJADhOYkkzPHvzcT' },
          },
          title: 'Plein de choses à faire à deux ;)',
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '41LC4UqDFJcMihS5uELawU',
          type: 'Entry',
          createdAt: '2020-07-28T14:18:50.976Z',
          updatedAt: '2020-10-12T20:12:38.015Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 49,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: { title: 'Offres duo', tags: ['duo'], hitsPerPage: 10 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '4Mr0DO6Lyt7r53A3ZTtQuj',
          type: 'Entry',
          createdAt: '2020-10-12T10:06:10.318Z',
          updatedAt: '2020-10-12T20:14:47.999Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 8,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: { title: 'Puisque tu aimes les visites', tags: ['visites'], hitsPerPage: 4 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '4TLmm3GKuj3U6QEC8Rd90F',
          type: 'Entry',
          createdAt: '2020-08-13T08:50:32.042Z',
          updatedAt: '2020-10-13T20:05:19.272Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 6,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: { layout: 'one-item-medium', minOffers: 1, title: 'Offres du moment' },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '4w8mtsIKDr7NhJuRk9u6WC',
          type: 'Entry',
          createdAt: '2020-10-13T20:12:58.372Z',
          updatedAt: '2020-10-13T20:12:58.372Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Découvre les livres sélectionnés pour le Goncourt des lycéens 2020\u00a0!',
          layout: 'two-items',
          minOffers: 2,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '5u3NaFTcu2XR5KgJ1OAg8C',
          type: 'Entry',
          createdAt: '2020-10-12T10:06:28.384Z',
          updatedAt: '2020-10-28T16:19:18.179Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 3,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          title: 'Puisque tu aimes les visites',
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '4Mr0DO6Lyt7r53A3ZTtQuj' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '66mkIlb2gWurNEdNsOZu6A' },
          },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '5xa0SUTU18l7YfZZFgxvGw',
          type: 'Entry',
          createdAt: '2020-10-12T09:50:31.664Z',
          updatedAt: '2020-10-28T14:49:31.709Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 3,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: { title: 'Pour bien commencer...', layout: 'one-item-medium', minOffers: 2 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '66mkIlb2gWurNEdNsOZu6A',
          type: 'Entry',
          createdAt: '2020-10-12T10:06:23.994Z',
          updatedAt: '2020-10-12T19:58:49.836Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 2,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: { title: 'Puisque tu aimes les visites...', layout: 'two-items', minOffers: 2 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '6L8Dpdp9wLRTnmyIdpErXT',
          type: 'Entry',
          createdAt: '2020-08-13T08:50:14.600Z',
          updatedAt: '2020-10-13T20:07:22.693Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 9,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: { title: 'Les offres du moment', tags: ['offre_du_moment'], hitsPerPage: 4 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '6aKQHURvMuLUXqFnr6dV7D',
          type: 'Entry',
          createdAt: '2020-10-29T15:35:35.598Z',
          updatedAt: '2020-10-29T15:35:35.598Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Parce que tu aimes la musique...',
          layout: 'one-item-medium',
          minOffers: 2,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '6lk6vCol5Qza2mfdtsTzW',
          type: 'Entry',
          createdAt: '2020-10-29T15:35:40.388Z',
          updatedAt: '2020-10-29T15:35:40.388Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'algolia' } },
          locale: 'en-US',
        },
        fields: {
          title: 'Parce que tu aimes la musique...',
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '7ELpkgmfriVTPiszrMNpzq' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '6aKQHURvMuLUXqFnr6dV7D' },
          },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '7ELpkgmfriVTPiszrMNpzq',
          type: 'Entry',
          createdAt: '2020-10-29T15:35:17.130Z',
          updatedAt: '2020-10-29T15:35:17.130Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          title: 'Musique',
          algoliaCategories: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '6LLWQtNaFQLoFSy8FLYRMB',
            },
          },
          hitsPerPage: 6,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '7c7xq3ulzqO2yDRJLDmths',
          type: 'Entry',
          createdAt: '2020-10-13T20:13:01.277Z',
          updatedAt: '2020-10-13T20:13:01.277Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          title: 'Découvre les livres sélectionnés pour le Goncourt des Lycéens\u00a0!',
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: 'JAhJxDb0L6p9EUXBiVt0J' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '4w8mtsIKDr7NhJuRk9u6WC' },
          },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: 'GlQb8Zg3n1PoYVmOyVCgW',
          type: 'Entry',
          createdAt: '2020-10-12T09:50:55.642Z',
          updatedAt: '2020-10-29T15:34:08.945Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 4,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: {
          title: 'Pour bien commencer...',
          algoliaParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '1QEiCosX8czkjnxf5CTsvR' },
          },
          displayParameters: {
            sys: { type: 'Link', linkType: 'Entry', id: '5xa0SUTU18l7YfZZFgxvGw' },
          },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: 'JAhJxDb0L6p9EUXBiVt0J',
          type: 'Entry',
          createdAt: '2020-10-13T20:12:35.505Z',
          updatedAt: '2020-10-13T20:26:07.952Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 2,
          contentType: { sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.ALGOLIA } },
          locale: 'en-US',
        },
        fields: { title: 'Goncourt', tags: ['goncourt'], hitsPerPage: 4 },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: 'K2yYJkeX30OoepIooo2Um',
          type: 'Entry',
          createdAt: '2020-07-22T08:47:00.599Z',
          updatedAt: '2020-10-12T20:03:42.832Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 18,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.BUSINESS },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Donne ton avis sur le pass\u00a0!',
          firstLine: 'Donne ton avis...',
          secondLine: 'En répondant à notre rapide questionnaire',
          image: { sys: { type: 'Link', linkType: 'Asset', id: '6kgALLZ7PL6vYubjvE8s0c' } },
          url: 'https://passculture.typeform.com/to/PYl2WwKC?email={email}',
          targetNotConnectedUsersOnly: undefined,
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: 'eLESwUjpZNqJyn9haXWGt',
          type: 'Entry',
          createdAt: '2020-10-12T20:40:08.977Z',
          updatedAt: '2020-10-14T12:28:32.602Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 3,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: ContentTypes.DISPLAY_PARAMETERS },
          },
          locale: 'en-US',
        },
        fields: { title: 'La sélection de ...', layout: 'one-item-medium', minOffers: 2 },
      },
    ],
    Asset: [
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '2qTXOFUocq1HhgB7Wzl23K',
          type: 'Asset',
          createdAt: '2020-10-28T14:41:35.898Z',
          updatedAt: '2020-10-28T14:41:35.898Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 1,
          locale: 'en-US',
        },
        fields: {
          title: 'Image spécial carnaval',
          file: {
            url: '//images.ctfassets.net/2bg01iqy0isv/2qTXOFUocq1HhgB7Wzl23K/a48ab7bedde13545231c0f843fbcfe10/image__3_.png',
            details: { size: 128147, image: { width: 596, height: 559 } },
            fileName: 'image (3).png',
            contentType: 'image/png',
          },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: '6kgALLZ7PL6vYubjvE8s0c',
          type: 'Asset',
          createdAt: '2020-07-06T15:36:15.148Z',
          updatedAt: '2020-07-22T10:26:36.835Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 8,
          locale: 'en-US',
        },
        fields: {
          title: 'Cover pour les blocs métiers',
          description: 'Image de fond pour les blocs métiers',
          file: {
            url: '//images.ctfassets.net/2bg01iqy0isv/6kgALLZ7PL6vYubjvE8s0c/8e545d3312343d25c776c3cded9e2784/Capture_d___e__cran_2020-07-22_a___12.24.11.png',
            details: { size: 616732, image: { width: 1934, height: 574 } },
            fileName: 'Capture d’écran 2020-07-22 à 12.24.11.png',
            contentType: 'image/png',
          },
        },
      },
      {
        sys: {
          space: { sys: { type: 'Link', linkType: 'Space', id: '2bg01iqy0isv' } },
          id: 'bRKhK9wmpNkD6l5Zeo71J',
          type: 'Asset',
          createdAt: '2020-10-14T14:17:25.524Z',
          updatedAt: '2020-10-22T15:47:34.835Z',
          environment: { sys: { id: 'testing', type: 'Link', linkType: 'Environment' } },
          revision: 3,
          locale: 'en-US',
        },
        fields: {
          title: 'Mbappé2',
          file: {
            url: '//images.ctfassets.net/2bg01iqy0isv/bRKhK9wmpNkD6l5Zeo71J/cc59c22fe0382b61e831e4693e32826f/1020_Mbapp__2.png',
            details: { size: 100820, image: { width: 450, height: 195 } },
            fileName: '1020_Mbappé2.png',
            contentType: 'image/png',
          },
        },
      },
    ],
  },
}
