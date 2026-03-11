# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.6.0] - 2026-03-11

### Added
- Add the `L09_PitchWasm` lab metadata and compose files.
- Add global and per-image `Makefile` support under `.docker-images` for bulk builds and multi-platform pushes.
- Add `push-multi` support to `.docker-images/base/dns/Makefile`.

### Changed
- Refresh compose and network configuration across the Wireshark, DNS enumeration, SMTP, TFTP, IPSec, SlowDoS, fuzzing, Mirai, serialization, MITM, and privilege escalation labs.
- Move active Docker image workflows to `.docker-images`, including the Topolinux, Pitch Vulnerable, Wireshark, and Wireshark Website images.

### Removed
- Remove the legacy `.dockerfiles` copies now superseded by `.docker-images`.

## [1.3.0] - 2026-03-11

### Added
- Add Topolinux.

## [1.0] - 2023-05-17

### Added
- VERSION, CHANGELOG and README files.

### Changed
- removed .dockerfiles and moved all the images in the `.docker-images` folder.
- moved the images in the `base` folder.
