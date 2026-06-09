import { Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chooseReviewPost } from '../lib/content';
import { posts } from '../lib/posts';
import { postPath } from '../lib/routes';

interface RandomReviewButtonProps {
  variant?: 'primary' | 'secondary';
}

export function RandomReviewButton({ variant = 'primary' }: RandomReviewButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className={variant === 'primary' ? 'primary-action' : 'secondary-action'}
      type="button"
      onClick={() => {
        const post = chooseReviewPost(posts);
        if (post) {
          navigate(postPath(post.slug));
        }
      }}
    >
      <Shuffle size={18} />
      随机复习
    </button>
  );
}
