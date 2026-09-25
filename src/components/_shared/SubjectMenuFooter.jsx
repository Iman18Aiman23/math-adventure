import CosmicMobileNav from '../CosmicMobileNav';

// Keep navigation outside .view-container so it stays visible while menus scroll.
export default function SubjectMenuFooter(props) {
  return <footer className="subject-menu-footer"><CosmicMobileNav {...props} appearance="math" /></footer>;
}
