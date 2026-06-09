import ReactMarkdown from 'react-markdown';

interface MarkdownArticleProps {
  content: string;
}

export function MarkdownArticle({ content }: MarkdownArticleProps) {
  return (
    <div className="article-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
