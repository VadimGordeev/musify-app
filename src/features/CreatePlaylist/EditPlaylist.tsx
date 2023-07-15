import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';
import { ReactComponent as CloseIcon } from '~/assets/icons/close.svg';

import styles from './EditPlaylist.module.scss';
import { type Playlist } from '../../entities/spotifyTypes';
import { type ModalState, modals } from '../../pages/PlaylistPage/PlaylistPage';
import { Button } from '../../shared/ui/Button/Button';
import { InputField } from '../../shared/ui/InputField/InputField';
import {
  useEditPlaylistImageMutation,
  useEditPlaylistTextMutation
} from '../../store/api/playlists/playlists.api';

export const EditPlaylist = ({
  onClick,
  playlist,
  state
}: {
  onClick: () => void;
  playlist: Playlist;
  state: ModalState;
}) => {
  const { id } = useParams<'id'>();

  const [editPlaylistText, { isSuccess: isTextUploadSuccess }] =
    useEditPlaylistTextMutation();
  const [editPlaylistImage, { isSuccess: isImageUploadSuccess }] =
    useEditPlaylistImageMutation();
  const [image, setImage] = useState<string>('');
  const [imageData, setImageBlob] = useState<string>('');

  const handleChnage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    const data = new FileReader();
    data.addEventListener('load', () => {
      const result = String(data.result);
      setImage(result.replace('data:', '').replace(/^.+,/, ''));
      setImageBlob(result);
    });
    data.readAsDataURL(event.target.files[0]);
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (isImageUploadSuccess) {
    onClick();
  }
  if (isTextUploadSuccess) {
    onClick();
  }

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>
            {state === modals.image
              ? 'Edit playlist image'
              : 'Edit playlist information'}
          </h2>
          <Button
            onClick={onClick}
            icon={<CloseIcon />}
          />
        </div>
        {state === modals.image ? (
          <form
            id="playlistModal"
            onSubmit={(event) => {
              event.preventDefault();
              void editPlaylistImage({ id: id || '', image });
            }}
          >
            <div className={styles.input_overflow}>
              {imageData ? (
                <img src={imageData} />
              ) : playlist.images.length > 0 ? (
                <img src={playlist.images[0].url}></img>
              ) : (
                <Cover />
              )}
              <InputField
                type="file"
                onChange={handleChnage}
              />
            </div>
            <div className={styles.btn_container}>
              <Button form="playlistModal">Edit</Button>
            </div>
          </form>
        ) : (
          <form
            id="playlistModal"
            onSubmit={(event) => {
              event.preventDefault();
              void editPlaylistText({
                id: id || '',
                payload: { name: name, description: description }
              });
            }}
          >
            <div className={styles.text_input}>
              <InputField
                shouldFitContainer
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                placeholder={'Name'}
              />
              <InputField
                shouldFitContainer
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
                placeholder={'Description'}
              />
            </div>
            <Button form="playlistModal">Edit</Button>
          </form>
        )}
      </div>
    </div>
  );
};
