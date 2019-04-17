import BonusPossibilitiesService from './BonusPossibilitiesService';
import api from './ApiService';

jest.mock('./ApiService');

const expectedUrl = '/user/bonus_possibilities';

describe('BonusPosibilitiesService', () => {
  test('BonusPosibilitiesService happy path', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTU1NzMyMDAsInN1YiI6MzksInR5cGUiOiJhY2Nlc3MifQ.X8T7myYc-hagX-W0Y8HN8UkWOlcVbr4uwygD6zpnLsg';
    const expectedConfig = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };
    const expectedResponse = {
      data: {
        id: '39',
        type: 'bonus-possibilities',
        relationships: {
          amounts: {
            data: [
              {
                id: '5',
                type: 'points',
              },
              {
                id: '25',
                type: 'points',
              },
              {
                id: '50',
                type: 'points',
              },
              {
                id: '75',
                type: 'points',
              },
              {
                id: '100',
                type: 'points',
              },
              {
                id: '125',
                type: 'points',
              },
            ],
          },
          tags: {
            data: [
              {
                id: '6',
                type: 'tags',
              },
              {
                id: '4',
                type: 'tags',
              },
              {
                id: '2',
                type: 'tags',
              },
              {
                id: '8',
                type: 'tags',
              },
              {
                id: '98',
                type: 'tags',
              },
              {
                id: '3',
                type: 'tags',
              },
              {
                id: '7',
                type: 'tags',
              },
              {
                id: '5',
                type: 'tags',
              },
            ],
          },
          receivers: {
            data: [
              {
                id: '51',
                type: 'users',
              },
              {
                id: '15',
                type: 'users',
              },
              {
                id: '58',
                type: 'users',
              },
              {
                id: '50',
                type: 'users',
              },
              {
                id: '23',
                type: 'users',
              },
              {
                id: '7',
                type: 'users',
              },
              {
                id: '25',
                type: 'users',
              },
              {
                id: '36',
                type: 'users',
              },
              {
                id: '45',
                type: 'users',
              },
              {
                id: '10',
                type: 'users',
              },
              {
                id: '59',
                type: 'users',
              },
              {
                id: '54',
                type: 'users',
              },
              {
                id: '48',
                type: 'users',
              },
              {
                id: '44',
                type: 'users',
              },
              {
                id: '12',
                type: 'users',
              },
              {
                id: '33',
                type: 'users',
              },
              {
                id: '24',
                type: 'users',
              },
              {
                id: '53',
                type: 'users',
              },
              {
                id: '43',
                type: 'users',
              },
              {
                id: '16',
                type: 'users',
              },
              {
                id: '28',
                type: 'users',
              },
              {
                id: '29',
                type: 'users',
              },
              {
                id: '21',
                type: 'users',
              },
              {
                id: '77',
                type: 'users',
              },
              {
                id: '6',
                type: 'users',
              },
              {
                id: '67',
                type: 'users',
              },
              {
                id: '70',
                type: 'users',
              },
              {
                id: '46',
                type: 'users',
              },
              {
                id: '34',
                type: 'users',
              },
              {
                id: '47',
                type: 'users',
              },
              {
                id: '20',
                type: 'users',
              },
              {
                id: '56',
                type: 'users',
              },
              {
                id: '63',
                type: 'users',
              },
              {
                id: '61',
                type: 'users',
              },
              {
                id: '9',
                type: 'users',
              },
              {
                id: '13',
                type: 'users',
              },
              {
                id: '14',
                type: 'users',
              },
              {
                id: '55',
                type: 'users',
              },
              {
                id: '22',
                type: 'users',
              },
              {
                id: '41',
                type: 'users',
              },
              {
                id: '57',
                type: 'users',
              },
              {
                id: '62',
                type: 'users',
              },
              {
                id: '18',
                type: 'users',
              },
              {
                id: '32',
                type: 'users',
              },
              {
                id: '26',
                type: 'users',
              },
              {
                id: '49',
                type: 'users',
              },
              {
                id: '17',
                type: 'users',
              },
              {
                id: '37',
                type: 'users',
              },
              {
                id: '5',
                type: 'users',
              },
              {
                id: '11',
                type: 'users',
              },
              {
                id: '4',
                type: 'users',
              },
              {
                id: '68',
                type: 'users',
              },
              {
                id: '35',
                type: 'users',
              },
              {
                id: '42',
                type: 'users',
              },
              {
                id: '19',
                type: 'users',
              },
              {
                id: '31',
                type: 'users',
              },
              {
                id: '38',
                type: 'users',
              },
            ],
          },
        },
      },
      included: [
        {
          id: '5',
          type: 'points',
          attributes: {
            value: 5,
          },
        },
        {
          id: '25',
          type: 'points',
          attributes: {
            value: 25,
          },
        },
        {
          id: '50',
          type: 'points',
          attributes: {
            value: 50,
          },
        },
        {
          id: '75',
          type: 'points',
          attributes: {
            value: 75,
          },
        },
        {
          id: '100',
          type: 'points',
          attributes: {
            value: 100,
          },
        },
        {
          id: '125',
          type: 'points',
          attributes: {
            value: 125,
          },
        },
        {
          id: '6',
          type: 'tags',
          attributes: {
            label: 'be-curious-never-stop-learning',
          },
        },
        {
          id: '4',
          type: 'tags',
          attributes: {
            label: 'communicate-transparently-honestly',
          },
        },
        {
          id: '2',
          type: 'tags',
          attributes: {
            label: 'create-awesomeness',
          },
        },
        {
          id: '8',
          type: 'tags',
          attributes: {
            label: 'innovate-make-mistakes-learn',
          },
        },
        {
          id: '98',
          type: 'tags',
          attributes: {
            label: 'jdfgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkx',
          },
        },
        {
          id: '3',
          type: 'tags',
          attributes: {
            label: 'set-people-up-to-succeed',
          },
        },
        {
          id: '7',
          type: 'tags',
          attributes: {
            label: 'win-win-win',
          },
        },
        {
          id: '5',
          type: 'tags',
          attributes: {
            label: 'work-hard-play-hard',
          },
        },
        {
          id: '51',
          type: 'users',
          attributes: {
            email: 'albert.fazullin@flatstack.com',
            'full-name': 'Albert Fazullin',
            username: 'albert.fazullin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 45,
            'allowance-balance': 500,
          },
        },
        {
          id: '15',
          type: 'users',
          attributes: {
            email: 'alexey.toksarov@flatstack.com',
            'full-name': 'Alexey Toksarov',
            username: 'alexey.toksarov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 5217,
            'allowance-balance': 500,
          },
        },
        {
          id: '58',
          type: 'users',
          attributes: {
            email: 'almaz.ibragimov@flatstack.com',
            'full-name': 'Almaz Ibragimov',
            username: 'almaz.ibragimov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 48,
            'allowance-balance': 500,
          },
        },
        {
          id: '50',
          type: 'users',
          attributes: {
            email: 'almaz.karimullin@flatstack.com',
            'full-name': 'Almaz Karimullin',
            username: 'almaz.karimullin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 175,
            'allowance-balance': 500,
          },
        },
        {
          id: '23',
          type: 'users',
          attributes: {
            email: 'amir.mingaliev@flatstack.com',
            'full-name': 'Amir Mingaliev',
            username: 'amir.mingaliev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 4034,
            'allowance-balance': 500,
          },
        },
        {
          id: '7',
          type: 'users',
          attributes: {
            email: 'arkadiy.butermanov@flatstack.com',
            'full-name': 'Arkadiy Butermanov',
            username: 'arkadiy.butermanov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 111,
            'allowance-balance': 500,
          },
        },
        {
          id: '25',
          type: 'users',
          attributes: {
            email: 'artem.biserov@flatstack.com',
            'full-name': 'Artem Biserov',
            username: 'artem.biserov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 45,
            'allowance-balance': 500,
          },
        },
        {
          id: '36',
          type: 'users',
          attributes: {
            email: 'arthur.shaydullin@flatstack.com',
            'full-name': 'Arthur Shaydullin',
            username: 'arthur.shaydullin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 32,
            'allowance-balance': 500,
          },
        },
        {
          id: '45',
          type: 'users',
          attributes: {
            email: 'arthur.zaharov@flatstack.com',
            'full-name': 'Arthur Zaharov',
            username: 'arthur.zaharov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 100,
            'allowance-balance': 500,
          },
        },
        {
          id: '10',
          type: 'users',
          attributes: {
            email: 'artur.minnullin@flatstack.com',
            'full-name': 'Artur Minnullin',
            username: 'artur.minnullin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 1046,
            'allowance-balance': 500,
          },
        },
        {
          id: '59',
          type: 'users',
          attributes: {
            email: 'bulat.ismagilov@flatstack.com',
            'full-name': 'Bulat Ismagilov',
            username: 'bulat.ismagilov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '54',
          type: 'users',
          attributes: {
            email: 'damir.nurgaliev@flatstack.com',
            'full-name': 'Damir Nurgaliev',
            username: 'damir.nurgaliev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 2,
            'allowance-balance': 500,
          },
        },
        {
          id: '48',
          type: 'users',
          attributes: {
            email: 'dmitry.fedorov@flatstack.com',
            'full-name': 'Dmitry Fedorov',
            username: 'dmitry.fedorov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 53,
            'allowance-balance': 500,
          },
        },
        {
          id: '44',
          type: 'users',
          attributes: {
            email: 'dmitry.mikheev@flatstack.com',
            'full-name': 'Dmitry Mikheev',
            username: 'dmitry.mikheev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '12',
          type: 'users',
          attributes: {
            email: 'dmitry.trager@flatstack.com',
            'full-name': 'Dmitry Trager',
            username: 'dmitry.trager',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 11,
            'allowance-balance': 500,
          },
        },
        {
          id: '33',
          type: 'users',
          attributes: {
            email: 'elena.belova@flatstack.com',
            'full-name': 'Elena Belova',
            username: 'elena.belova',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 99328,
            'allowance-balance': 500,
          },
        },
        {
          id: '24',
          type: 'users',
          attributes: {
            email: 'ellina.kuznetcova@flatstack.com',
            'full-name': 'Ellina Kuznetcova',
            username: 'ellina.kuznetcova',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 7,
            'allowance-balance': 500,
          },
        },
        {
          id: '53',
          type: 'users',
          attributes: {
            email: 'emil.safiullin@flatstack.com',
            'full-name': 'Emil Safiullin',
            username: 'emil.safiullin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '43',
          type: 'users',
          attributes: {
            email: 'rebase-demo@flatstack.com',
            'full-name': 'Flatstack Rebase Demo',
            username: 'rebase-demo',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 70,
            'allowance-balance': 500,
          },
        },
        {
          id: '16',
          type: 'users',
          attributes: {
            email: 'ildar.zalyalov@flatstack.com',
            'full-name': 'Ildar Zalyalov',
            username: 'ildar.zalyalov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 23,
            'allowance-balance': 500,
          },
        },
        {
          id: '28',
          type: 'users',
          attributes: {
            email: 'ilkham.gaysin@flatstack.com',
            'full-name': 'Ilkham Gaysin',
            username: 'ilkham.gaysin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 627,
            'allowance-balance': 500,
          },
        },
        {
          id: '29',
          type: 'users',
          attributes: {
            email: 'ilya.eremin@flatstack.com',
            'full-name': 'Ilya Eremin',
            username: 'ilya.eremin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 1100,
            'allowance-balance': 500,
          },
        },
        {
          id: '21',
          type: 'users',
          attributes: {
            email: 'ilyas.garaev@flatstack.com',
            'full-name': 'Ilyas Garaev',
            username: 'ilyas.garaev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 126,
            'allowance-balance': 500,
          },
        },
        {
          id: '77',
          type: 'users',
          attributes: {
            email: 'ivan.ananev@flatstack.com',
            'full-name': 'Ivan Ananev',
            username: 'ivan.ananev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '6',
          type: 'users',
          attributes: {
            email: 'example+email@example.com',
            'full-name': 'John Smith',
            username: 'john.smith',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 11,
            'allowance-balance': 495,
          },
        },
        {
          id: '67',
          type: 'users',
          attributes: {
            email: 'john.travolta@gmail.com',
            'full-name': 'John Travolta',
            username: 'john.travolta',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '70',
          type: 'users',
          attributes: {
            email: 'johny.english@gmail.com',
            'full-name': 'Johny English',
            username: 'johny.english',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '46',
          type: 'users',
          attributes: {
            email: 'kirill.kayumov@flatstack.com',
            'full-name': 'Kirill Kayumov',
            username: 'kirill.kayumov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 65,
            'allowance-balance': 500,
          },
        },
        {
          id: '34',
          type: 'users',
          attributes: {
            email: 'leyla.khamidullina@flatstack.com',
            'full-name': 'Leyla Khamidullina',
            username: 'leyla.khamidullina',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 50077,
            'allowance-balance': 500,
          },
        },
        {
          id: '47',
          type: 'users',
          attributes: {
            email: 'leysan.farrahova@flatstack.com',
            'full-name': 'Leysan Farrahova',
            username: 'leysan.farrahova',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '20',
          type: 'users',
          attributes: {
            email: 'marat.fakhreev@flatstack.com',
            'full-name': 'Marat Fakhreev',
            username: 'marat.fakhreev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 5003,
            'allowance-balance': 500,
          },
        },
        {
          id: '56',
          type: 'users',
          attributes: {
            email: 'marat.galeev@flatstack.com',
            'full-name': 'Marat Galeev',
            username: 'marat.galeev',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/56/profile_image/avatar-1c60123168afa9e50a8a0655d7b18be1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190404%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190404T145810Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=26312ba534a0f47cc7ba58ff5c4b9323047df8f9157f9646753b96663b5be711',
            'bonus-balance': 20,
            'allowance-balance': 500,
          },
        },
        {
          id: '63',
          type: 'users',
          attributes: {
            email: 'mariya.valeeva@flatstack.com',
            'full-name': 'Mariya Valeeva',
            username: 'mariya-valeeva',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/63/profile_image/avatar-33139013e0e2bfac3c20a9ccd20701e2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=3dae1835bacd618d968dd31f0e32c6804054c87ef84d51f0adb38caad7667212',
            'bonus-balance': 8480,
            'allowance-balance': 829,
          },
        },
        {
          id: '61',
          type: 'users',
          attributes: {
            email: 'marsel.mustafin@flatstack.com',
            'full-name': 'Marsel Mustafin',
            username: 'marsel.mustafin',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/61/profile_image/avatar-de7a692eca9581eaf730131e33ee4fa7.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=42f545f3d3d4d9e7a9fb00d69fa48574cb8d2fdd02ab867ec3ce44163b13bfcb',
            'bonus-balance': 8622,
            'allowance-balance': 990,
          },
        },
        {
          id: '9',
          type: 'users',
          attributes: {
            email: 'maxim.larionov@flatstack.com',
            'full-name': 'Maxim Larionov',
            username: 'maxim.larionov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 82,
            'allowance-balance': 500,
          },
        },
        {
          id: '13',
          type: 'users',
          attributes: {
            email: 'nail.aliev@flatstack.com',
            'full-name': 'Nail Aliev',
            username: 'nail.aliev',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/13/profile_image/avatar-c0c979a4d5bddf0509778163d34edf91.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190404%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190404T145810Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e761e809cd26b7423092407920809510219b1a3d532f2a4984d39cf87dd1291d',
            'bonus-balance': 5,
            'allowance-balance': 500,
          },
        },
        {
          id: '14',
          type: 'users',
          attributes: {
            email: 'nataliya.odrinskaya@flatstack.com',
            'full-name': 'Nataliya Odrinskaya',
            username: 'nataliya.odrinskaya',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '55',
          type: 'users',
          attributes: {
            email: 'eduard.ryazapov@flatstack.com',
            'full-name': 'New User',
            username: 'eduard.ryazapov',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/55/profile_image/avatar-b95563d12ec64c667076037c0a763877.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190404%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190404T145810Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=8644daa7ed328e1ce1a1c5a30dc6fb16c5bdd9176e42c1afbb2a3e34e5c493ce',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '22',
          type: 'users',
          attributes: {
            email: 'nikita.asabin@flatstack.com',
            'full-name': 'Nikita Asabin',
            username: 'nikita.asabin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 3,
            'allowance-balance': 500,
          },
        },
        {
          id: '41',
          type: 'users',
          attributes: {
            email: 'niyaz.serazetdinov@flatstack.com',
            'full-name': 'Niyaz Serazetdinov',
            username: 'niyaz.serazetdinov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '57',
          type: 'users',
          attributes: {
            email: 'oleg.gorelov@flatstack.com',
            'full-name': 'Oleg Gorelov',
            username: 'oleg.gorelov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 36,
            'allowance-balance': 500,
          },
        },
        {
          id: '62',
          type: 'users',
          attributes: {
            email: 'olga.krasnova@flatstack.com',
            'full-name': 'Olga Krasnova',
            username: 'krasnova-olga',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/62/profile_image/avatar-9c17bcabdb06f23cc9c93a1d6994bc1a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=a3649ea87568d0e39cf0f1396c0d4f0b08f765c98f48dc74c6eafdaa9870a935',
            'bonus-balance': 10074,
            'allowance-balance': 490,
          },
        },
        {
          id: '18',
          type: 'users',
          attributes: {
            email: 'pavel.soldakov@flatstack.com',
            'full-name': 'Pavel Soldakov',
            username: 'pavel.soldakov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 2751,
            'allowance-balance': 500,
          },
        },
        {
          id: '32',
          type: 'users',
          attributes: {
            email: 'rafik.habibullin@flatstack.com',
            'full-name': 'Rafik Habibullin',
            username: 'rafik.habibullin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 274,
            'allowance-balance': 500,
          },
        },
        {
          id: '26',
          type: 'users',
          attributes: {
            email: 'ramil.gabdrakhmanov@flatstack.com',
            'full-name': 'Ramil Gabdrakhmanov',
            username: 'ramil.gabdrakhmanov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 1100,
            'allowance-balance': 500,
          },
        },
        {
          id: '49',
          type: 'users',
          attributes: {
            email: 'ramilya.nigmatullina@flatstack.com',
            'full-name': 'Ramilya Nigmatullina',
            username: 'ramilya.nigmatullina',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 2596,
            'allowance-balance': 1500,
          },
        },
        {
          id: '17',
          type: 'users',
          attributes: {
            email: 'rustem.giniyatullin@flatstack.com',
            'full-name': 'Rustem Giniyatullin',
            username: 'rustem.giniyatullin',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 20,
            'allowance-balance': 500,
          },
        },
        {
          id: '37',
          type: 'users',
          attributes: {
            email: 'rustem.mukhamadiev@flatstack.com',
            'full-name': 'Rustem Mukhamadiev',
            username: 'rustem.mukhamadiev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 8704,
            'allowance-balance': 500,
          },
        },
        {
          id: '5',
          type: 'users',
          attributes: {
            email: 'slava.kisel@flatstack.com',
            'full-name': 'Slava Kisel',
            username: 'slava.kisel',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 1,
            'allowance-balance': 500,
          },
        },
        {
          id: '11',
          type: 'users',
          attributes: {
            email: 'timur.nurislamov@flatstack.com',
            'full-name': 'Timur Nurislamov',
            username: 'timur.nurislamov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '4',
          type: 'users',
          attributes: {
            email: 'timur.vafin@flatstack.com',
            'full-name': 'Timur Vafin',
            username: 'timur.vafin',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/4/profile_image/avatar-9975dac16a4f86e1ae6c4e21ababc37c.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=420dec0842e9e62fe38f7207323ab0934f14c1b40e0f2e2d4974c63432f62b6c',
            'bonus-balance': 4934,
            'allowance-balance': 500,
          },
        },
        {
          id: '68',
          type: 'users',
          attributes: {
            email: 'me@timurv.ru',
            'full-name': 'Timur Vafin',
            username: 'timurv',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 495,
          },
        },
        {
          id: '35',
          type: 'users',
          attributes: {
            email: 'viktor.chernyaev@flatstack.com',
            'full-name': 'Viktor Chernyaev',
            username: 'viktor.chernyaev',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 85,
            'allowance-balance': 500,
          },
        },
        {
          id: '42',
          type: 'users',
          attributes: {
            email: 'vladimir.bazhanov@flatstack.com',
            'full-name': 'Vladimir Bazhanov',
            username: 'vladimir.bazhanov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '19',
          type: 'users',
          attributes: {
            email: 'vladimir.temnikov@flatstack.com',
            'full-name': 'Vladimir Temnikov',
            username: 'vladimir.temnikov',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
        {
          id: '31',
          type: 'users',
          attributes: {
            email: 'vladislav.nikoshnov@flatstack.com',
            'full-name': 'Vladislav Nikoshnov',
            username: 'vladislav.nikoshnov',
            'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/31/profile_image/avatar-bc4f9ee1d496e5296422c466e75a5ca9.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190404%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190404T145810Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b4f6c088c875cb4fdee1784d842f89a3a71ba729603df9f76935c138ecca1cdc',
            'bonus-balance': 5,
            'allowance-balance': 500,
          },
        },
        {
          id: '38',
          type: 'users',
          attributes: {
            email: 'yuliana.amanova@flatstack.com',
            'full-name': 'Yuliana Amanova',
            username: 'yuliana.amanova',
            'profile-image-avatar-url': 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
            'bonus-balance': 0,
            'allowance-balance': 500,
          },
        },
      ],
    };

    const mockApiServiceGet = jest.fn(
      () => new Promise((resolve) => {
        resolve(expectedResponse);
      })
    );

    api.get.mockImplementation(mockApiServiceGet);

    // Act
    const actualResponse = await BonusPossibilitiesService.fetchPosibilities(expectedToken);

    //Assert
    expect(expectedResponse).toEqual(actualResponse);
    expect(api.get).toHaveBeenCalledWith(expectedUrl, expectedConfig)
  });
});



