import { SuggestionB } from '@api/weatherApi.types.backend';
import { useClickAway } from '@uidotdev/usehooks';
import { RefObject, use, useEffect, useState } from 'react'

type AutocompleteSuggestionsProps = {
  onClose: () => void;
  suggestionPromise: Promise<SuggestionB[]>;
  onSuggestionClick: (suggestion: SuggestionB) => void;
};

export const AutocompleteList = ({ suggestionPromise, onSuggestionClick, onClose }: AutocompleteSuggestionsProps) => {
  const suggestions = use(suggestionPromise);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useClickAway(() => {
    onClose();
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
      listRef.current?.children[selectedIndex + 1]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      listRef.current?.children[selectedIndex - 1]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      onSuggestionClick(suggestions[selectedIndex]);
    }
  };

  useEffect(() => {
    const inputElement = document.querySelector<HTMLInputElement>('[name="city"]');
    inputElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      inputElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, suggestions]);

  return (
    <div ref={listRef as RefObject<HTMLDivElement>} className={'autocompleteList'}>
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.id}
          className={`${'suggestionItem'} ${index === selectedIndex ? 'activeSuggestion' : ''}`}
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion.name}
        </div>
      ))}
      { suggestions.length === 0 && <div className={'suggestionItem'}>Brak wynikow</div> }
    </div>
  );
};